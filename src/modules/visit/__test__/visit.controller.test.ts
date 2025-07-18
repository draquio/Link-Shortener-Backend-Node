import { VisitController } from '../visit.controller';
import { mock } from 'jest-mock-extended';
import { VisitService } from '../visit.service';
import { Request, Response } from 'express';
import { NotFoundError } from '@/errors/NotFoundError';
import { ShortCodeValidator } from '@/validators/shortCode.validator';

describe('VisitController', () => {
  const visitService = mock<VisitService>();
  const controller = new VisitController(visitService);

  const mockRequest = (shortcode: string): Partial<Request> => ({
    params: { shortcode },
    ip: '1.1.1.1',
    headers: {
      'user-agent': 'jest-agent',
      referer: 'jest-referer',
    },
  });

  const mockResponse = (): Partial<Response> => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('responde 200 con URL correcta', async () => {
    const req = mockRequest('abc123') as Request;
    const res = mockResponse() as Response;

    visitService.processVisit.mockResolvedValue('https://example.com');

    await controller.processVisit(req, res);

    expect(visitService.processVisit).toHaveBeenCalledWith('abc123', {
      ip: '1.1.1.1',
      userAgent: 'jest-agent',
      referrer: 'jest-referer',
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'URL retrieved successfully',
      data: 'https://example.com',
    });
  });

it('lanza error si ShortCodeValidator falla (shortcode inválido)', async () => {
  const req = mockRequest('!@#$') as Request;
  const res = mockResponse() as Response;

await expect(controller.processVisit(req, res)).rejects.toThrow(/Shortcode must contain only letters and numbers/);

  expect(visitService.processVisit).not.toHaveBeenCalled();
});

  it('lanza error si visitService lanza NotFoundError', async () => {
    const req = mockRequest('nope') as Request;
    const res = mockResponse() as Response;

    visitService.processVisit.mockRejectedValue(new NotFoundError('Shortcode'));

    await expect(controller.processVisit(req, res)).rejects.toThrow(NotFoundError);
  });
});
