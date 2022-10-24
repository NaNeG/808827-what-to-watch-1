import {User} from '../../types/user.type.js';

import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import { createSHA256, isPasswordValid } from '../../utils/common.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.email = data.email;
    this.profilePictureLink = data.profilePictureLink;
    this.name = data.name;
  }

  @prop({ unique: true, required: true })
  public email!: string;

  @prop({required: true, default: ''})
  public profilePictureLink!: string;

  @prop({required: true, default: ''})
  public name!: string;

  @prop({required: true, default: ''})
  private password!: string;

  public setPassword(password: string, salt: string) {
    if (isPasswordValid(password)) {
      this.password = createSHA256(password, salt);
    } else {
      throw new Error('Password length is not correct');
    }
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
