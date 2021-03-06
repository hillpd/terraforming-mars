import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {ResourceType} from '../../ResourceType';
import {Game} from '../../Game';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectOption} from '../../inputs/SelectOption';
import {IResourceCard} from '../ICard';
import {LogHelper} from '../../components/LogHelper';
import {Resources} from '../../Resources';
import {AddResourcesToCard} from '../../deferredActions/AddResourcesToCard';

export class JupiterFloatingStation implements IProjectCard, IResourceCard {
    public cost = 9;
    public tags = [Tags.JOVIAN];
    public name = CardName.JUPITER_FLOATING_STATION;
    public cardType = CardType.ACTIVE;
    public resourceType = ResourceType.FLOATER;
    public resourceCount: number = 0;

    public canPlay(player: Player): boolean {
      return player.getTagCount(Tags.SCIENCE) >= 3;
    }

    public canAct(): boolean {
      return true;
    }

    public action(player: Player, game: Game) {
      return new OrOptions(
        new SelectOption('Add 1 floater to a Jovian card', 'Add floater', () => {
          game.defer(new AddResourcesToCard(player, game, ResourceType.FLOATER, 1, Tags.JOVIAN, 'Add 1 floater to a Jovian card'));
          return undefined;
        }),
        new SelectOption('Gain 1 MC per floater here (max 4) ', 'Gain MC', () => {
          const amount = Math.min(this.resourceCount, 4);
          player.megaCredits += amount;
          LogHelper.logGainStandardResource(game, player, Resources.MEGACREDITS, amount);
          return undefined;
        }),
      );
    }

    public play() {
      return undefined;
    }

    public getVictoryPoints(): number {
      return 1;
    }
}
