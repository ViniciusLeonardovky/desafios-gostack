import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // Pegando o token que esta dentro dos headers da requisicao
  const authHeader = req.headers.authorization;

  // Verificando se possui algo nele
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // Separando o Bearer do conteudo do token
  const [, token] = authHeader.split(' ');

  try {
    // Usando o promisify para poder usar o async await quando for validar o token
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // colocar na requisicao o id do usuario atraves do token informado
    req.userId = decoded.id;

    return next();
  } catch (err) {
    // Retorna o erro caso o token seja invalido
    return res.status(401).json({ error: 'Token invalid' });
  }
};
