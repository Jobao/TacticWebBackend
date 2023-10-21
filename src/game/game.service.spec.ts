import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { Game } from './schemas/game.schema';
import { CacheService } from 'src/game-cache/cache.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService, CacheService],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("pp", async ()=>{
    expect(await service.getGame("504ec53a-567a-447f-b657-e4f327728bd2")).toBeInstanceOf(Game)
  })
});
