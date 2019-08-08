import { Entity, model, property } from '@loopback/repository';

@model({ settings: {} })
export class Comment extends Entity {
  @property({
    type: 'number',
    id: true,
    required: false,
    generated: true
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  comment: string;

  @property({
    type: 'number',
    required: true,
  })
  user: number;

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
