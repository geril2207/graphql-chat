import { Module } from '@nestjs/common'
import { DataLoaderService } from './dataloader.service'
import { ChatLoader } from './dataloaders/chat.loader'
import { MessageLoader } from './dataloaders/message.loader'
import { UserLoader } from './dataloaders/user.loader'

@Module({
        providers: [DataLoaderService, UserLoader, ChatLoader, MessageLoader],
  exports: [DataLoaderService],
})
export class DataLoaderModule {}
