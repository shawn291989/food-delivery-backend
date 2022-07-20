import {
  Controller,
  Post,
  Body,
  Query,
  Get,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './dto/purchase.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('purchase')
@Controller({ path: 'purchase', version: '1' })
export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService,
  ) { }

  @Post()
  async getRestaurants(
    @Body() purchaseDto: PurchaseDto
  ) {
    const result = await this.purchaseService.purchase(
      purchaseDto
    )
    return result;
  }
}
