import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Comment } from '../models';
import { CommentRepository } from '../repositories';
import {
  authenticate,
} from '@loopback/authentication';
export class CommentController {
  constructor(
    @repository(CommentRepository)
    public commentRepository: CommentRepository,
  ) { }

  @post('/comments', {
    responses: {
      '200': {
        description: 'Comment model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Comment) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, { exclude: ['id'] }),
        },
      },
    })
    comment: Omit<Comment, 'id'>,
  ): Promise<Comment> {
    return this.commentRepository.create(comment);
  }

  @get('/comments/count', {
    responses: {
      '200': {
        description: 'Comment model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Comment)) where?: Where<Comment>,
  ): Promise<Count> {
    return this.commentRepository.count(where);
  }

  @get('/comments', {
    responses: {
      '200': {
        description: 'Array of Comment model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Comment) },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.query.object('filter', getFilterSchemaFor(Comment)) filter?: Filter<Comment>,
  ): Promise<Comment[]> {
    return this.commentRepository.find(filter);
  }

  @patch('/comments', {
    responses: {
      '200': {
        description: 'Comment PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, { partial: true }),
        },
      },
    })
    comment: Comment,
    @param.query.object('where', getWhereSchemaFor(Comment)) where?: Where<Comment>,
  ): Promise<Count> {
    return this.commentRepository.updateAll(comment, where);
  }

  @get('/comments/{id}', {
    responses: {
      '200': {
        description: 'Comment model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Comment) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Comment> {
    return this.commentRepository.findById(id);
  }

  @patch('/comments/{id}', {
    responses: {
      '204': {
        description: 'Comment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, { partial: true }),
        },
      },
    })
    comment: Comment,
  ): Promise<void> {
    await this.commentRepository.updateById(id, comment);
  }

  @put('/comments/{id}', {
    responses: {
      '204': {
        description: 'Comment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() comment: Comment,
  ): Promise<void> {
    await this.commentRepository.replaceById(id, comment);
  }

  @del('/comments/{id}', {
    responses: {
      '204': {
        description: 'Comment DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.commentRepository.deleteById(id);
  }
}
