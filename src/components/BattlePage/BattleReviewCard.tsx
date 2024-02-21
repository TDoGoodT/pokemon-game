import { BattleReview, BattleStats } from "./Battle"

export interface BattleReviewCardProps {
    battleReview?: BattleReview,
    battleStats?: BattleStats,
    nextRound: () => void
}
export const BattleReviewCard: React.FC<BattleReviewCardProps> = ({
    battleReview,
    battleStats,
    nextRound
}) => {
    return (
        battleReview ? <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
                <p>{battleReview.opponentAttack.name} {">>>"} {battleReview.opponentAttack.effectivePower}</p>
                <p>{battleReview.pokemonAttack.name} {">>>"} {battleReview.pokemonAttack.effectivePower}</p>
                {battleStats?.winner ? <p>Your Pokemon won!</p> : <p>Your Pokemon lost!</p>}
            </div>
            <button onClick={nextRound}>Next Round</button>
        </div> : null
    )
}