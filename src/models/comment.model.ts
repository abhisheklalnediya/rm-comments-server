import { Entity, model, property } from '@loopback/repository';

@model({ settings: {} })
export class Comment extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  comment: string;

  @property({
    type: 'string',
    default: null,
  })
  parent: string;

  @property({
    type: 'boolean',
    default: false,
  })
  deleted: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  edited: boolean;

  @property({
    type: 'string',
  })
  owner: string;

  @property({
    type: 'date',
    default: '$now',
  })
  time: string;


  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
}

export type CommentWithRelations = Comment & CommentRelations;
