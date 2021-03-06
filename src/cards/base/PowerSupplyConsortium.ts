import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Game} from '../../Game';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {DecreaseAnyProduction} from '../../deferredActions/DecreaseAnyProduction';

export class PowerSupplyConsortium implements IProjectCard {
    public cost = 5;
    public tags = [Tags.ENERGY];
    public name = CardName.POWER_SUPPLY_CONSORTIUM;
    public cardType = CardType.AUTOMATED;

    public canPlay(player: Player): boolean {
      return player.getTagCount(Tags.ENERGY) >= 2;
    }


    public play(player: Player, game: Game) {
      player.addProduction(Resources.ENERGY);
      game.defer(new DecreaseAnyProduction(player, game, Resources.ENERGY, 1));
      return undefined;
    }
}
