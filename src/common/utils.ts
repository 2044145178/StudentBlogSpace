import {nanoid} from "nanoid";
import {ResOp} from "../interface";
import ErrorConstants from './error_constants';


export function generateUUID(): string {
  return nanoid();
}

export function res(op?: ResOp): ResOp {
  return {
    data: op?.data ?? null,
    code: op?.code ?? 200,
    message: op?.code
      ? getErrorMessageByCode(op!.code) || op?.message || 'unknown error'
      : op?.message || 'success',
  };
}

/**
 * 根据code获取错误信息
 */
export function getErrorMessageByCode(code: number): string {
  return ErrorConstants[code];
}
