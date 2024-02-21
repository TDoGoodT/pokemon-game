import React from "react";
import { Ability } from "../../types";

export interface AttacksCardProps {
    attacks: Ability[];
    onSelectedAttack?: (attack: Ability) => void;
}

export const AttacksCard: React.FC<AttacksCardProps> = ({
    attacks,
    onSelectedAttack
}) => {
    console.log(attacks);
    return (
        <table style={{ textAlign: "center", width: "100%" }}>
            <tbody>
                <tr>
                    {attacks.slice(0, 2).map((attack, index) => {
                        return <td key={index}>
                            <button
                                style={{ width: "100%" }}
                                onClick={() => { if (onSelectedAttack) { onSelectedAttack(attack) } }
                                } disabled={onSelectedAttack === undefined}>{attack.name} [{attack.effectivePower}]</button>
                        </td>
                    }
                    )}
                </tr>
                <tr>
                    {attacks.slice(2, 4).map((attack, index) => {
                        return <td key={index}>
                            <button
                                style={{ width: "100%" }}
                                onClick={() => { if (onSelectedAttack) { onSelectedAttack(attack) } }
                                } disabled={onSelectedAttack === undefined}>{attack.name} [{attack.effectivePower}]</button>
                        </td>
                    }
                    )}
                </tr>
            </tbody>
        </table>
    )
}