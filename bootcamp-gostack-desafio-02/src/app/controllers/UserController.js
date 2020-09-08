import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    // Validacao dos campos de entrada
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fails validation' });
    }

    // Verificando caso o email não exista
    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(400).json({ message: 'email already exists' });
    }

    // Criando o usuario com as informacoes passadas pelo corpo da requisicao
    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    // Validacao dos campos
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fails validation' });
    }

    const { email, oldPassword } = req.body;

    // Localizando o usuario atraves do id que eh gravado na hora de autenticacao
    // dentro das requisicoes (middlewares/auth.js)
    const user = await User.findByPk(req.userId);

    // Verificando caso email ja exista
    if (email !== user.email) {
      const emailExists = await User.findOne({
        where: { email },
      });

      if (emailExists) {
        return res.status(400).json({ message: 'email already exists' });
      }
    }

    // verificando caso o campo de senha antiga esteja preenchido
    // e caso ela esteja correta com atraves do bcrypt.compare
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // Atualizar os dados fornecidos
    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();
