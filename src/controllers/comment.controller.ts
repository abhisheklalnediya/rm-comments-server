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
  authenticate, AuthenticationBindings, UserProfile,
} from '@loopback/authentication';
import { inject } from '@loopback/core';
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
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, { exclude: ['id'] }),
        },
      },
    })
    comment: Omit<Comment, 'id'>,
    @inject(AuthenticationBindings.CURRENT_USER) currentUser: UserProfile,
  ): Promise<Comment> {
    const data: Comment = { ...comment, owner: currentUser.name || "unknown" }
    return this.commentRepository.create(data);
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
  async find(
    @param.query.object('filter', getFilterSchemaFor(Comment)) filterParam?: Filter<Comment>,
  ): Promise<Comment[]> {
    const filter = filterParam || { where: { deleted: false, edited: false } }
    return this.commentRepository.find(filter);
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
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
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
  @authenticate('jwt')
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
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.commentRepository.updateById(id, { deleted: true });
    // await this.commentRepository.deleteById(id);
  }
}
