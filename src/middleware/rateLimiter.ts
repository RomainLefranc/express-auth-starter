import { NextFunction, Response, Request } from "express";
import { rateLimiterConfig } from "../config/rateLimiter.config";

const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ratelimiter = rateLimiterConfig();

  ratelimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch((e) => {
      return res.status(401).json({
        message: "Too Many Requests",
      });
    });
};

export default rateLimiter;
