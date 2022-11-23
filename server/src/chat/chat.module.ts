import { Module } from '@nestjs/common'
import { MessageModule } from 'src/message/message.module'
import { ChatResolver } from './chat.resolver'

@Module({
  providers: [ChatResolver],
})
export class ChatModule {}
