import util from 'util'
import jsonwebtoken from "jsonwebtoken";

export const verify = util.promisify(jsonwebtoken.verify);
export const sign = util.promisify(jsonwebtoken.sign);


