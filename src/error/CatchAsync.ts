import { Request, Response, NextFunction } from "express";

const CatchAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

export default CatchAsync;
