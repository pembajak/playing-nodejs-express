import db from '../../db/models/index.js'
import { BadRequestError } from '../../utils/api-errors.js'
import bcrypt from 'bcryptjs'
import { generateJWT } from './jwt.service.js'
import { ApiSuccess } from '../../utils/api-succes.js'


const MemberService = {

  // Register service
  doRegister: async (requestBody) => {

    const { email, first_name, last_name, password } = requestBody;

    // check email 
    const userEmail = await db.User.findOne({
      where: { email: email }
    })

    if (userEmail !== null) {
      throw new BadRequestError('Email sudah terdafar')
    }

    const hashPassword = await bcrypt.hash(password, 8)

    const user = db.User.build({
      first_name: first_name,
      email: email,
      last_name: last_name,
      password: hashPassword,
      balance: 0
    });

    await user.save();

    return ApiSuccess.MessageInstance("Registrasi berhasil silahkan login")
    

  },
  /**
   * doLogin
   * @param {*} requestBody 
   * @returns 
   */
  doLogin: async (requestBody) => {

    const { email, password } = requestBody;
    const user = await db.User.findOne({
      where: { email: email }
    })

    if (!user) {
      throw new BadRequestError('Username atau password salah')
    }

    const isValidPass = bcrypt.compareSync(password, user.password)
    if (!isValidPass) {
      throw new BadRequestError('Username atau password salah')
    }

    const payload = {
      email: user.email,
    }

    const accessToken = await generateJWT({
      payload
    })

    return ApiSuccess.MessageDataInstance("Login Sukses",{
      token: accessToken
    }) 

  },
  /**
   * getProfile
   * @param {*} req 
   * @returns 
   */
  getProfile: async (req) => {
    const email = req.headers.data.email
    const user = await db.User.findOne({
      where: { email: email }
    })

    if (!user) {
      throw new BadRequestError('User tidak di temukan')
    }

    return ApiSuccess.DataInstance({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_image: user.profile_image
    })
  },
  /**
   * update Profile
   * @param {} req 
   * @returns 
   */
  updateProfile: async (req) => {

    const email = req.headers.data.email
    const { first_name, last_name } = req.body;

    const user = await db.User.findOne({
      where: { email: email }
    })

    if (user === null) {
      throw new BadRequestError('User tidak di temukan')
    }

    await user.update({
      first_name: first_name,
      last_name: last_name
    },
    );

    await user.save();

    return ApiSuccess.MessageDataInstance("Update Pofile berhasil",{
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_image: user.profile_image
    })
  },

  /**
   * uploadProfile
   * @param {*} req 
   */
  uploadProfile: async (req) => {

    const email = req.headers.data.email
    const file = req.headers.file

    const user = await db.User.findOne({
      where: { email: email }
    })

    if (!user) {
      throw new BadRequestError('User tidak di temukan')
    }

    await user.update({
      profile_image: `/images/${file}`
    },
    );

    await user.save();
    return ApiSuccess.MessageDataInstance("Update Profile Image berhasil",{
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_image: user.profile_image
    })
  }

}

export default MemberService