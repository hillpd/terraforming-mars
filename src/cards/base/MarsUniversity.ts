import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Game} from '../../Game';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectCard} from '../../inputs/SelectCard';
import {SelectOption} from '../../inputs/SelectOption';
import {CardName} from '../../CardName';
import {DeferredAction} from '../../deferredActions/DeferredAction';
import {CardMetadata} from '../CardMetadata';
import {CardRenderer} from '../render/CardRenderer';

export class MarsUniversity implements IProjectCard {
    public cost = 8;
    public tags = [Tags.SCIENCE, Tags.STEEL];
    public name = CardName.MARS_UNIVERSITY;
    public cardType = CardType.ACTIVE;

    public onCardPlayed(player: Player, game: Game, card: IProjectCard) {
      const scienceTags = card.tags.filter((tag) => tag === Tags.SCIENCE).length;
      for (let i = 0; i < scienceTags; i++) {
        game.defer(new DeferredAction(
          player,
          () => {
            // No card to discard
            if (player.cardsInHand.length === 0) {
              return undefined;
            }
            return new OrOptions(
              new SelectCard('Select a card to discard', 'Discard', player.cardsInHand, (foundCards: Array<IProjectCard>) => {
                player.cardsInHand.splice(player.cardsInHand.indexOf(foundCards[0]), 1);
                game.dealer.discard(foundCards[0]);
                player.cardsInHand.push(game.dealer.dealCard());
                return undefined;
              }),
              new SelectOption('Do nothing', 'Confirm', () => {
                return undefined;
              }),
            );
          },
        ));
      }
      return undefined;
    }
    public play() {
      return undefined;
    }
    public getVictoryPoints() {
      return 1;
    }

    public metadata: CardMetadata = {
      cardNumber: '073',
      renderData: CardRenderer.builder((b) => {
        b.effectBox((eb) => {
          eb.science().played.startEffect.minus().cards(1).plus().cards(1)
            .description('Effect: When you play a Science tag, including this, you may discard a card from hand to draw a card.');
        });
      }),
      victoryPoints: 1,
    }
}
