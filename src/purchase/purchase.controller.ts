import {
  Controller,
  Post,
  Body
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './dto/purchase.dto';
import { Response } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PaymentHistory } from './entities/paymentHistory.entity';
import { PurchaseResponseDto } from './dto/purchase.response.dto';
@ApiTags('Purchase')
@Controller({ path: 'purchase', version: '1' })
export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService,
  ) { }
  @ApiOkResponse({
    description: 'Make Purchase.',
    type: PurchaseDto,
  })
  @ApiOperation({ description: 'This API performs, Process a user purchasing a dish from a restaurant, handling all relevant data changes in an atomic transaction.' })
  @ApiBody({ type: CreatePurchaseDto })
  @Post()
  async purchases(
    @Body() purchaseDto: PurchaseDto
  ): Promise<PurchaseResponseDto> {
    return await this.purchaseService.purchase(
      purchaseDto
    )
  }
}
