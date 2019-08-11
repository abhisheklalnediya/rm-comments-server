import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    indexes: {
      username: {
        keys: {
          username: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class User extends Entity {

  @property({
    type: 'string',
    required: true,
    index: { unique: true }
  })
  email: string;

  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    index: { unique: true }
  })
  name: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
