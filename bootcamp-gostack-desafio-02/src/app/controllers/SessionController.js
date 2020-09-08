import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';

import User from '../models/User';

// Validacao dos campos de entrada
class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required('email field is required'),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fails validation' });
    }

    // Pegando a senha do corpo da requisicao
    const { password } = req.body;

    // Localizar o usuario que o email da requisicao esteja cadastrado
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(401).json({ error: 'email not found' });
    }

    // Comparar a senha da requisicao com a senha encritografada
    // (a comparacao é feita no model atraves da funcao checkPassword)
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'password does not match' });
    }

    const { id, name, email } = user;
    // Retornando os dados visiveis ao usuario
    // E o token gerado, passando como payload o id do usuario
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
