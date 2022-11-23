import { registerEnumType } from '@nestjs/graphql'

export enum SortEnum {
  'asc' = 'asc',
  'desc' = 'desc',
}
registerEnumType(SortEnum, {
  name: 'SortEnum',
})
