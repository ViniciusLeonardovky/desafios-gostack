import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        // Campos da tabela a serem utilizados
        // (nao eh necessario que estejam todos os campos da tabela do banco de dados)
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // campo "VIRUTAL" nao existe de fato no banco
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    // Metodo para encriptografar a senha
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // Metodo para verificar se a senha (normal) bate com a senha encriptografada
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
