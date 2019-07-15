'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token');
  }

  category () {
    return this.hasMany('App/Models/Category', 'id', 'id_user');
  }

  product () {
    return this.hasMany('App/Models/Product', 'id', 'id_user');
  }

  order () {
    return this.hasMany('App/Models/Order', 'id', 'id_users');
  }

  payment () {
    return this.hasMany('App/Models/Payment', 'id', 'id_users');
  }
}

module.exports = User;
