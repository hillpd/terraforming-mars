import {expect} from 'chai';
import {CaretakerContract} from '../../../src/cards/base/CaretakerContract';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestingUtils';

describe('CaretakerContract', function() {
  let card : CaretakerContract; let player : Player; let game : Game;

  beforeEach(function() {
    card = new CaretakerContract();
    player = TestPlayers.BLUE.newPlayer();
    game = new Game('foobar', [player, player], player);
  });

  it('Can\'t play or act', function() {
    expect(card.canPlay(player, game)).is.not.true;
    expect(card.canAct(player, game)).is.not.true;
  });

  it('Should play', function() {
    (game as any).temperature = 0;
    expect(card.canPlay(player, game)).is.true;
  });

  it('Should act', function() {
    player.heat = 8;
    card.action(player, game);
    expect(player.heat).to.eq(0);
    expect(player.getTerraformRating()).to.eq(21);
  });
});
