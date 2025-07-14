import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { JwtService } from '@nestjs/jwt';
import { AUTHENTICATION_CONFIG } from '../../../config/authentication-config';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-jwt-token'),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('generateToken', () => {
    it('should return a valid token object', () => {
      const result = controller.generateToken();

      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: AUTHENTICATION_CONFIG.MOCK_USER_ID,
      });

      expect(result).toEqual({
        token: 'mocked-jwt-token',
      });
    });
  });
});
