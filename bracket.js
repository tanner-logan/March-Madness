import { Houston, SIUEdward, Gonzaga, Georgia, Clemson, McNeese, Purdue, HighPoint, Illinois, Xavier, Kentucky, Troy, UCLA, UtahSt, Tennessee, Wofford, Florida, NorfolkSt, UConn, Oklahoma, Memphis, ColoradoSt, Maryland, GrandCanyon, Missouri, Drake, TexasTech, NCWilmington, Kansas, Arkansas, StJohns, Omaha, Auburn, AlabamaSt, Louisville, Creighton, Michigan, UCSD, TexasAM, Yale, Mississippi, NorthCarolina, IowaSt, Lipscomb, Marquette, NewMexico, MichiganSt, Bryant, Duke, American, MississippiSt, Baylor, Oregon, Liberty, Arizona, Akron, BYU, VCU, Wisconsin, Montana, SaintMarys, Vanderbilt, Alabama, RobertMorris } from "./teams.js";

document.getElementById("magicbtn").addEventListener("click", function () {
	const mwest = [Houston, SIUEdward, Gonzaga, Georgia, Clemson, McNeese, Purdue, HighPoint, Illinois, Xavier, Kentucky, Troy, UCLA, UtahSt, Tennessee, Wofford];
	const west = [Florida, NorfolkSt, UConn, Oklahoma, Memphis, ColoradoSt, Maryland, GrandCanyon, Missouri, Drake, TexasTech, NCWilmington, Kansas, Arkansas, StJohns, Omaha];
	const south = [Duke, American, MississippiSt, Baylor, Oregon, Liberty, Arizona, Akron, BYU, VCU, Wisconsin, Montana, SaintMarys, Vanderbilt, Alabama, RobertMorris];
	const east = [Auburn, AlabamaSt, Louisville, Creighton, Michigan, UCSD, TexasAM, Yale, Mississippi, NorthCarolina, IowaSt, Lipscomb, Marquette, NewMexico, MichiganSt, Bryant];
	let totalFouls = 0;
	let totalFTPercentage = 0;
	const teamRecordWeight = (document.getElementById("teamRecord_Slider").value * 5) / 100; // converts to percentage from 0-100%
	const ftAttPGWeight = (document.getElementById("ftAttPG").value * 5) / 100;
	const fgPercentageWeight = (document.getElementById("fgPercentage").value * 5) / 100;
	const toPGWeight = (document.getElementById("toPG").value * 5) / 100;
	const oRebPGWeight = (document.getElementById("oRebPG").value * 5) / 100;
	const dRebPGWeight = (document.getElementById("dRebPG").value * 5) / 100;
	const ThreePTPGWeight = (document.getElementById("ThreePTPG").value * 5) / 100;
	const SOSWeight = (document.getElementById("SOS").value * 5) / 100;
	const ftPercentageWeight = (document.getElementById("ftPercentage").value * 5) / 100;
	const stealsPGWeight = (document.getElementById("stealsPG").value * 5) / 100;
	const blocksPGWeight = (document.getElementById("blocksPG").value * 5) / 100;
	const foulsPGWeight = (document.getElementById("foulsPG").value * 5) / 100;
	const assistsPGWeight = (document.getElementById("assistsPG").value * 5) / 100;
	const pointsPGWeight = (document.getElementById("pointsPG").value * 5) / 100;
	const opponentsPointsPGWeight = (document.getElementById("opponentsPointsPG").value * 5) / 100;
	let optionalFTBuffChecked = document.getElementById("optionalFTBuff").checked;

	// Helper to update team names and accumulate totals for round 64.
	function updateTeamNames(teams, prefix, startIndex) {
		// teams: array of team objects, prefix: e.g. "c1s", startIndex: starting number for element suffix.
		let index = startIndex;
		teams.forEach((team) => {
			totalFouls += Number(team.foulsPG);
			totalFTPercentage += Number(team.ftPercentage);
			document.getElementById(`${prefix}${index}`).textContent = team.name;
			index++;
		});
		return index;
	}

	// Replace round 64 loops with the helper:
	updateTeamNames(west, "c1s", 17);
	updateTeamNames(east, "c1s", 1);
	updateTeamNames(south, "c11s", 1);
	updateTeamNames(mwest, "c11s", 17);

	const checkWinner = (t1, t2) => {
		const game = {
			team1: t1.name,
			team2: t2.name,
			record: [t1.record, t2.record],
			ftAttPG: [t1.ftAttPG, t2.ftAttPG],
			ftPercentage: [t1.ftPercentage, t2.ftPercentage],
			fgPercentage: [t1.fgPercentage, t2.fgPercentage],
			toPG: [t1.toPG, t2.toPG],
			oRebPG: [t1.oRebPG, t2.oRebPG],
			dRebPG: [t1.dRebPG, t2.dRebPG],
			ThreePTPG: [t1.ThreePTPG, t2.ThreePTPG],
			SOS: [t1.SOS, t2.SOS],
			stealsPG: [t1.stealsPG, t2.stealsPG],
			blocksPG: [t1.blocksPG, t2.blocksPG],
			injuries: [t1.injuries, t2.injuries],
			foulsPG: [t1.foulsPG, t2.foulsPG],
			assistsPG: [t1.assistsPG, t2.assistsPG],
			pointsPG: [t1.pointsPG, t2.pointsPG],
			oppPointsPG: [t1.opponentsPointsPG, t2.opponentsPointsPG],
		};

		// OVERALL HEAD TO HEAD SCORE
		let team1Score = 0;
		let team2Score = 0;

		// TEAM RECORDS
		const team1RecordArr = game.record[0].match(/[\d\.]+/g);
		const team2RecordArr = game.record[1].match(/[\d\.]+/g);

		const winPct = (recordArr) => {
			const totalGames = Number(recordArr[0]) + Number(recordArr[1]);
			return recordArr[0] / totalGames;
		};

		function roundToTwoDecimals(value) {
			return Math.round(value * 100) / 100;
		}

		// TEAM WIN PERCENTAGE
		function calculateWinPctScoreAdjustment(diff, weight) {
			const thresholds = [
				{ threshold: 0.7, multiplier: 1.75 },
				{ threshold: 0.5, multiplier: 1.5 },
				{ threshold: 0.4, multiplier: 1.25 },
				{ threshold: 0.3, multiplier: 1 },
				{ threshold: 0.2, multiplier: 0.75 },
				{ threshold: 0.1, multiplier: 0.5 },
				{ threshold: 0.05, multiplier: 0.25 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return roundToTwoDecimals(weight * item.multiplier);
				}
			}
			return 0;
		}

		const team1Pct = winPct(team1RecordArr);
		const team2Pct = winPct(team2RecordArr);

		if (team1Pct > team2Pct) {
			const pctDiff = team1Pct - team2Pct;
			team1Score += calculateWinPctScoreAdjustment(pctDiff, teamRecordWeight);
		} else if (team2Pct > team1Pct) {
			const pctDiff = team2Pct - team1Pct;
			team2Score += calculateWinPctScoreAdjustment(pctDiff, teamRecordWeight);
		}

		// TEAM FREE THROW ATTEMPTS PER GAME
		function calculateScoreAdjustment(diff, weight) {
			const thresholds = [
				{ threshold: 14, multiplier: 1.8 },
				{ threshold: 12, multiplier: 1.6 },
				{ threshold: 10, multiplier: 1.4 },
				{ threshold: 8, multiplier: 1.2 },
				{ threshold: 6, multiplier: 1 },
				{ threshold: 4, multiplier: 0.8 },
				{ threshold: 2, multiplier: 0.6 },
				{ threshold: 1, multiplier: 0.4 },
				{ threshold: 0.5, multiplier: 0.2 },
				{ threshold: 0.25, multiplier: 0.1 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return roundToTwoDecimals(weight * item.multiplier);
				}
			}
			return 0;
		}

		const team1FAPG = Number(game.ftAttPG[0]);
		const team2FAPG = Number(game.ftAttPG[1]);

		if (team1FAPG > team2FAPG) {
			const FAPGdiff = team1FAPG - team2FAPG;
			team1Score += calculateScoreAdjustment(FAPGdiff, ftAttPGWeight);
		} else if (team2FAPG > team1FAPG) {
			const FAPGdiff = team2FAPG - team1FAPG;
			team2Score += calculateScoreAdjustment(FAPGdiff, ftAttPGWeight);
		}

		// TEAM FIELD GOAL PERCENTAGE
		const team1FGpct = Number(game.fgPercentage[0]);
		const team2FGpct = Number(game.fgPercentage[1]);

		function calculateFGpctScoreAdjustment(diff, weight) {
			const thresholds = [
				{ threshold: 15, multiplier: 1.8 },
				{ threshold: 12, multiplier: 1.6 },
				{ threshold: 10, multiplier: 1.4 },
				{ threshold: 8, multiplier: 1.2 },
				{ threshold: 6, multiplier: 1 },
				{ threshold: 4, multiplier: 0.8 },
				{ threshold: 2, multiplier: 0.6 },
				{ threshold: 1, multiplier: 0.4 },
				{ threshold: 0.5, multiplier: 0.2 },
				{ threshold: 0.25, multiplier: 0.1 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return roundToTwoDecimals(weight * item.multiplier);
				}
			}
			return 0;
		}

		if (team1FGpct > team2FGpct) {
			const FGpctDiff = team1FGpct - team2FGpct;
			team1Score += calculateFGpctScoreAdjustment(FGpctDiff, fgPercentageWeight);
		} else if (team2FGpct > team1FGpct) {
			const FGpctDiff = team2FGpct - team1FGpct;
			team2Score += calculateFGpctScoreAdjustment(FGpctDiff, fgPercentageWeight);
		}

		// TURNOVERS PER GAME
		const team1toPG = Number(game.toPG[0]);
		const team2toPG = Number(game.toPG[1]);

		function calculateToPGScoreAdjustment(diff, weight) {
			const thresholds = [
				{ threshold: 8, multiplier: 1.8 },
				{ threshold: 7, multiplier: 1.6 },
				{ threshold: 6, multiplier: 1.4 },
				{ threshold: 5, multiplier: 1.2 },
				{ threshold: 4, multiplier: 1 },
				{ threshold: 3, multiplier: 0.8 },
				{ threshold: 2, multiplier: 0.6 },
				{ threshold: 1, multiplier: 0.4 },
				{ threshold: 0.5, multiplier: 0.2 },
				{ threshold: 0.25, multiplier: 0.1 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return roundToTwoDecimals(weight * item.multiplier);
				}
			}
			return 0;
		}

		if (team1toPG > team2toPG) {
			const TODiff = team1toPG - team2toPG;
			team2Score += calculateToPGScoreAdjustment(TODiff, toPGWeight);
		} else if (team2toPG > team1toPG) {
			const TODiff = team2toPG - team1toPG;
			team1Score += calculateToPGScoreAdjustment(TODiff, toPGWeight);
		}

		// OFFENSIVE REBOUNDS PER GAME
		const team1oRebPG = Number(game.oRebPG[0]);
		const team2oRebPG = Number(game.oRebPG[1]);

		function calculateORebPGScoreAdjustment(diff, weight) {
			const thresholds = [
				{ threshold: 11, multiplier: 1.8 },
				{ threshold: 9, multiplier: 1.6 },
				{ threshold: 7, multiplier: 1.4 },
				{ threshold: 6, multiplier: 1.2 },
				{ threshold: 5, multiplier: 1 },
				{ threshold: 4, multiplier: 0.8 },
				{ threshold: 3, multiplier: 0.6 },
				{ threshold: 2, multiplier: 0.4 },
				{ threshold: 1, multiplier: 0.2 },
				{ threshold: 0.5, multiplier: 0.1 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return roundToTwoDecimals(weight * item.multiplier);
				}
			}
			return 0;
		}

		if (team1oRebPG > team2oRebPG) {
			const oRebPGDiff = team1oRebPG - team2oRebPG;
			team1Score += calculateORebPGScoreAdjustment(oRebPGDiff, oRebPGWeight);
		} else if (team2oRebPG > team1oRebPG) {
			const oRebPGDiff = team2oRebPG - team1oRebPG;
			team2Score += calculateORebPGScoreAdjustment(oRebPGDiff, oRebPGWeight);
		}

		// DEFENSIVE REBOUNDS PER GAME
		const team1dRebPG = Number(game.dRebPG[0]);
		const team2dRebPG = Number(game.dRebPG[1]);

		function calculateDRebPGScoreAdjustment(diff, weight) {
			const thresholds = [
				{ threshold: 11, multiplier: 1.8 },
				{ threshold: 9, multiplier: 1.6 },
				{ threshold: 7, multiplier: 1.4 },
				{ threshold: 6, multiplier: 1.2 },
				{ threshold: 5, multiplier: 1 },
				{ threshold: 4, multiplier: 0.8 },
				{ threshold: 3, multiplier: 0.6 },
				{ threshold: 2, multiplier: 0.4 },
				{ threshold: 1, multiplier: 0.2 },
				{ threshold: 0.5, multiplier: 0.1 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return roundToTwoDecimals(weight * item.multiplier);
				}
			}
			return 0;
		}

		if (team1dRebPG > team2dRebPG) {
			const dRebPGDiff = team1dRebPG - team2dRebPG;
			team1Score += calculateDRebPGScoreAdjustment(dRebPGDiff, dRebPGWeight);
		} else if (team2dRebPG > team1dRebPG) {
			const dRebPGDiff = team2dRebPG - team1dRebPG;
			team2Score += calculateDRebPGScoreAdjustment(dRebPGDiff, dRebPGWeight);
		}

		// 3PT PER GAME
		const team13PTPG = Number(game.ThreePTPG[0]);
		const team23PTPG = Number(game.ThreePTPG[1]);

		function calculateThreePTPGScoreAdjustment(diff, weight) {
			const thresholds = [
				{ threshold: 9, multiplier: 1.8 },
				{ threshold: 8, multiplier: 1.6 },
				{ threshold: 7, multiplier: 1.4 },
				{ threshold: 6, multiplier: 1.2 },
				{ threshold: 5, multiplier: 1 },
				{ threshold: 4, multiplier: 0.8 },
				{ threshold: 3, multiplier: 0.6 },
				{ threshold: 2, multiplier: 0.4 },
				{ threshold: 1, multiplier: 0.2 },
				{ threshold: 0.5, multiplier: 0.1 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return roundToTwoDecimals(weight * item.multiplier);
				}
			}
			return 0;
		}

		if (team13PTPG > team23PTPG) {
			const ThreePTDiff = team13PTPG - team23PTPG;
			team1Score += calculateThreePTPGScoreAdjustment(ThreePTDiff, ThreePTPGWeight);
		} else if (team23PTPG > team13PTPG) {
			const ThreePTDiff = team23PTPG - team13PTPG;
			team2Score += calculateThreePTPGScoreAdjustment(ThreePTDiff, ThreePTPGWeight);
		}

		// STRENGTH OF SCHEDULE
		const team1SOS = Number(game.SOS[0]);
		const team2SOS = Number(game.SOS[1]);

		function calculateSOSScoreAdjustment(diff, weight) {
			const thresholds = [
				{ threshold: 18, multiplier: 2.2 },
				{ threshold: 16, multiplier: 2 },
				{ threshold: 14, multiplier: 1.8 },
				{ threshold: 12, multiplier: 1.6 },
				{ threshold: 10, multiplier: 1.4 },
				{ threshold: 8, multiplier: 1.2 },
				{ threshold: 6, multiplier: 1 },
				{ threshold: 5, multiplier: 0.9 },
				{ threshold: 4, multiplier: 0.8 },
				{ threshold: 3, multiplier: 0.7 },
				{ threshold: 2, multiplier: 0.5 },
				{ threshold: 1, multiplier: 0.4 },
				{ threshold: 0.5, multiplier: 0.2 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return roundToTwoDecimals(weight * item.multiplier);
				}
			}
			return 0;
		}

		if (team1SOS > team2SOS) {
			const SOSDiff = team1SOS - team2SOS;
			team1Score += calculateSOSScoreAdjustment(SOSDiff, SOSWeight);
		} else if (team2SOS > team1SOS) {
			const SOSDiff = team2SOS - team1SOS;
			team2Score += calculateSOSScoreAdjustment(SOSDiff, SOSWeight);
		}

		// STEALS PER GAME
		const team1stealsPG = Number(game.stealsPG[0]);
		const team2stealsPG = Number(game.stealsPG[1]);

		function calculateStealsPGScoreAdjustment(diff, weight) {
			const thresholds = [
				{ threshold: 7, multiplier: 1.7 },
				{ threshold: 6, multiplier: 1.5 },
				{ threshold: 5.5, multiplier: 1.4 },
				{ threshold: 5, multiplier: 1.3 },
				{ threshold: 4.5, multiplier: 1.2 },
				{ threshold: 4, multiplier: 1.1 },
				{ threshold: 3.5, multiplier: 1 },
				{ threshold: 3, multiplier: 0.9 },
				{ threshold: 2, multiplier: 0.7 },
				{ threshold: 1.5, multiplier: 0.6 },
				{ threshold: 1, multiplier: 0.5 },
				{ threshold: 0.5, multiplier: 0.4 },
				{ threshold: 0.25, multiplier: 0.3 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return roundToTwoDecimals(weight * item.multiplier);
				}
			}
			return 0;
		}

		if (team1stealsPG > team2stealsPG) {
			const stealsDiff = team1stealsPG - team2stealsPG;
			team1Score += calculateStealsPGScoreAdjustment(stealsDiff, stealsPGWeight);
		} else if (team2stealsPG > team1stealsPG) {
			const stealsDiff = team2stealsPG - team1stealsPG;
			team2Score += calculateStealsPGScoreAdjustment(stealsDiff, stealsPGWeight);
		}

		// BLOCKS PER GAME
		const team1blocksPG = Number(game.blocksPG[0]);
		const team2blocksPG = Number(game.blocksPG[1]);

		function calculateBlocksPGScoreAdjustment(diff, weight) {
			const thresholds = [
				{ threshold: 5, multiplier: 1.7 },
				{ threshold: 4.5, multiplier: 1.6 },
				{ threshold: 4, multiplier: 1.5 },
				{ threshold: 3.5, multiplier: 1.4 },
				{ threshold: 3, multiplier: 1.3 },
				{ threshold: 2.5, multiplier: 1.2 },
				{ threshold: 2, multiplier: 1 },
				{ threshold: 1.75, multiplier: 0.9 },
				{ threshold: 1.5, multiplier: 0.7 },
				{ threshold: 1.25, multiplier: 0.6 },
				{ threshold: 1, multiplier: 0.5 },
				{ threshold: 0.5, multiplier: 0.3 },
				{ threshold: 0.25, multiplier: 0.2 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return roundToTwoDecimals(weight * item.multiplier);
				}
			}
			return 0;
		}

		if (team1blocksPG > team2blocksPG) {
			const blocksDiff = team1blocksPG - team2blocksPG;
			team1Score += calculateBlocksPGScoreAdjustment(blocksDiff, blocksPGWeight);
		} else if (team2blocksPG > team1blocksPG) {
			const blocksDiff = team2blocksPG - team1blocksPG;
			team2Score += calculateBlocksPGScoreAdjustment(blocksDiff, blocksPGWeight);
		}

		// FREE THROW PERCENTAGE
		const team1FTPercentage = Number(game.ftPercentage[0]);
		const team2FTPercentage = Number(game.ftPercentage[1]);

		function calculateFTPercentageScoreAdjustment(diff, weight) {
			const thresholds = [
				{ threshold: 19, multiplier: 2.2 },
				{ threshold: 16, multiplier: 2 },
				{ threshold: 13, multiplier: 1.8 },
				{ threshold: 10, multiplier: 1.6 },
				{ threshold: 7, multiplier: 1.4 },
				{ threshold: 5, multiplier: 1.2 },
				{ threshold: 4, multiplier: 1 },
				{ threshold: 3, multiplier: 0.8 },
				{ threshold: 2.5, multiplier: 0.7 },
				{ threshold: 2, multiplier: 0.6 },
				{ threshold: 1.5, multiplier: 0.5 },
				{ threshold: 1, multiplier: 0.4 },
				{ threshold: 0.5, multiplier: 0.3 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return roundToTwoDecimals(weight * item.multiplier);
				}
			}
			return 0;
		}

		if (team1FTPercentage > team2FTPercentage) {
			const ftPercentageDiff = team1FTPercentage - team2FTPercentage;
			team1Score += calculateFTPercentageScoreAdjustment(ftPercentageDiff, ftPercentageWeight);
		} else if (team2FTPercentage > team1FTPercentage) {
			const ftPercentageDiff = team2FTPercentage - team1FTPercentage;
			team2Score += calculateFTPercentageScoreAdjustment(ftPercentageDiff, ftPercentageWeight);
		}

		// INJURIES
		const team1injuries = Number(game.injuries[0]);
		const team2injuries = Number(game.injuries[1]);

		function calculateInjuriesScoreAdjustment(diff) {
			const thresholds = [
				{ threshold: 8, score: 1 },
				{ threshold: 5, score: 0.5 },
				{ threshold: 3, score: 0.2 },
				{ threshold: 2, score: 0.15 },
				{ threshold: 1, score: 0.1 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return item.score;
				}
			}
			return 0;
		}

		if (team1injuries > team2injuries) {
			const injuriesDiff = team1injuries - team2injuries;
			team1Score += calculateInjuriesScoreAdjustment(injuriesDiff);
		} else if (team2injuries > team1injuries) {
			const injuriesDiff = team2injuries - team1injuries;
			team2Score += calculateInjuriesScoreAdjustment(injuriesDiff);
		}

		// FOULS PER GAME
		const team1FoulsPG = Number(game.foulsPG[0]);
		const team2FoulsPG = Number(game.foulsPG[1]);

		function calculateFoulsPGScoreAdjustment(diff, weight) {
			const thresholds = [
				{ threshold: 11, multiplier: 2.2 },
				{ threshold: 9, multiplier: 2 },
				{ threshold: 7, multiplier: 1.8 },
				{ threshold: 5, multiplier: 1.6 },
				{ threshold: 3, multiplier: 1.4 },
				{ threshold: 2, multiplier: 1.2 },
				{ threshold: 1, multiplier: 1 },
				{ threshold: 0.75, multiplier: 0.9 },
				{ threshold: 0.5, multiplier: 0.8 },
				{ threshold: 0.25, multiplier: 0.7 },
				{ threshold: 0.15, multiplier: 0.6 },
				{ threshold: 0.1, multiplier: 0.5 },
				{ threshold: 0.05, multiplier: 0.4 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return roundToTwoDecimals(weight * item.multiplier);
				}
			}
			return 0;
		}

		if (team1FoulsPG > team2FoulsPG) {
			const foulsDiff = team1FoulsPG - team2FoulsPG;
			team2Score += calculateFoulsPGScoreAdjustment(foulsDiff, foulsPGWeight);
		} else if (team2FoulsPG > team1FoulsPG) {
			const foulsDiff = team2FoulsPG - team1FoulsPG;
			team1Score += calculateFoulsPGScoreAdjustment(foulsDiff, foulsPGWeight);
		}

		// ASSISTS PER GAME
		const team1assistsPG = Number(game.assistsPG[0]);
		const team2assistsPG = Number(game.assistsPG[1]);

		function calculateAssistsPGScoreAdjustment(diff, weight) {
			const thresholds = [
				{ threshold: 11, multiplier: 1.8 },
				{ threshold: 9, multiplier: 1.6 },
				{ threshold: 7, multiplier: 1.4 },
				{ threshold: 5, multiplier: 1.2 },
				{ threshold: 4, multiplier: 1 },
				{ threshold: 3, multiplier: 0.8 },
				{ threshold: 2, multiplier: 0.6 },
				{ threshold: 1, multiplier: 0.4 },
				{ threshold: 0.5, multiplier: 0.3 },
				{ threshold: 0.25, multiplier: 0.2 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return roundToTwoDecimals(weight * item.multiplier);
				}
			}
			return 0;
		}

		if (team1assistsPG > team2assistsPG) {
			const assistsDiff = team1assistsPG - team2assistsPG;
			team1Score += calculateAssistsPGScoreAdjustment(assistsDiff, assistsPGWeight);
		} else if (team2assistsPG > team1assistsPG) {
			const assistsDiff = team2assistsPG - team1assistsPG;
			team2Score += calculateAssistsPGScoreAdjustment(assistsDiff, assistsPGWeight);
		}

		// POINTS PER GAME
		const team1pointsPG = Number(game.pointsPG[0]);
		const team2pointsPG = Number(game.pointsPG[1]);

		function calculatePointsPGScoreAdjustment(diff, weight) {
			const thresholds = [
				{ threshold: 20, multiplier: 1.8 },
				{ threshold: 18, multiplier: 1.6 },
				{ threshold: 16, multiplier: 1.4 },
				{ threshold: 14, multiplier: 1.2 },
				{ threshold: 12, multiplier: 1 },
				{ threshold: 10, multiplier: 0.8 },
				{ threshold: 8, multiplier: 0.6 },
				{ threshold: 6, multiplier: 0.4 },
				{ threshold: 4, multiplier: 0.2 },
				{ threshold: 2, multiplier: 0.1 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return roundToTwoDecimals(weight * item.multiplier);
				}
			}
			return 0;
		}

		if (team1pointsPG > team2pointsPG) {
			const pointsPGDiff = team1pointsPG - team2pointsPG;
			team1Score += calculatePointsPGScoreAdjustment(pointsPGDiff, pointsPGWeight);
		} else if (team2pointsPG > team1pointsPG) {
			const pointsPGDiff = team2pointsPG - team1pointsPG;
			team2Score += calculatePointsPGScoreAdjustment(pointsPGDiff, pointsPGWeight);
		}

		// OPPONENTS POINTS PER GAME
		const team1OppPointsPG = Number(game.oppPointsPG[0]);
		const team2OppPointsPG = Number(game.oppPointsPG[1]);

		function calculateOppPointsPGScoreAdjustment(diff, weight) {
			const thresholds = [
				{ threshold: 20, multiplier: 1.8 },
				{ threshold: 18, multiplier: 1.6 },
				{ threshold: 16, multiplier: 1.4 },
				{ threshold: 14, multiplier: 1.2 },
				{ threshold: 12, multiplier: 1 },
				{ threshold: 10, multiplier: 0.8 },
				{ threshold: 8, multiplier: 0.6 },
				{ threshold: 6, multiplier: 0.4 },
				{ threshold: 4, multiplier: 0.2 },
				{ threshold: 2, multiplier: 0.1 },
			];

			for (const item of thresholds) {
				if (diff >= item.threshold) {
					return roundToTwoDecimals(weight * item.multiplier);
				}
			}
			return 0;
		}

		if (team1OppPointsPG > team2OppPointsPG) {
			const oppPointsPGDiff = team1OppPointsPG - team2OppPointsPG;
			team2Score += calculateOppPointsPGScoreAdjustment(oppPointsPGDiff, opponentsPointsPGWeight);
		} else if (team2OppPointsPG > team1OppPointsPG) {
			const oppPointsPGDiff = team2OppPointsPG - team1OppPointsPG;
			team1Score += calculateOppPointsPGScoreAdjustment(oppPointsPGDiff, opponentsPointsPGWeight);
		}

		// CONDITIONAL FREE THROW BUFF
		if (optionalFTBuffChecked) {
			const averageFoulsPG = totalFouls / 64;
			const averageFTPercentage = totalFTPercentage / 64;

			function applyFTBuff(teamScoreToModify, teamFTPercentageToCheck, teamFoulsPGToCheck, opponentFTPercentage, opponentFoulsPG) {
				if (teamFoulsPGToCheck > averageFoulsPG && teamFTPercentageToCheck > averageFTPercentage) {
					const totalOverAverageFTPercentage = teamFTPercentageToCheck - averageFTPercentage;
					const totalOverAverageFoulsPG = teamFoulsPGToCheck - averageFoulsPG;
					const totalFTAdvantage = totalOverAverageFTPercentage + totalOverAverageFoulsPG;

					const thresholds = [
						{ threshold: 12, score: 0.8 },
						{ threshold: 9, score: 0.7 },
						{ threshold: 7, score: 0.6 },
						{ threshold: 5, score: 0.5 },
						{ threshold: 4, score: 0.4 },
						{ threshold: 3, score: 0.3 },
						{ threshold: 2, score: 0.2 },
						{ threshold: 1, score: 0.1 },
						{ threshold: 0.5, score: 0.075 },
						{ threshold: 0.25, score: 0.05 },
					];

					for (const item of thresholds) {
						if (totalFTAdvantage >= item.threshold) {
							return teamScoreToModify + item.score;
						}
					}
				}
				return teamScoreToModify;
			}

			team1Score = applyFTBuff(team1Score, team1FTPercentage, team2FoulsPG, team2FTPercentage, team1FoulsPG);
			team2Score = applyFTBuff(team2Score, team2FTPercentage, team1FoulsPG, team1FTPercentage, team2FoulsPG);
		}

		//console.log(`${game.team1}: ${team1Score}  ${game.team2}: ${team2Score}`);
		// DECIDE WINNER
		let winner = "";
		switch (true) {
			case team1Score > team2Score:
				winner = t1;
				break;
			case team2Score > team1Score:
				winner = t2;
				break;
			case team1Score == team2Score:
				game.fgPercentage[0] > game.fgPercentage[1] ? (winner = t1) : (winner = t2);
				break;
		}
		return winner;
	};

	const getWestWinner = () => {
		// Round of 64
		let rnd64wMatch1Winner = checkWinner(west[0], west[1]);
		let rnd64wMatch2Winner = checkWinner(west[2], west[3]);
		let rnd64wMatch3Winner = checkWinner(west[4], west[5]);
		let rnd64wMatch4Winner = checkWinner(west[6], west[7]);
		let rnd64wMatch5Winner = checkWinner(west[8], west[9]);
		let rnd64wMatch6Winner = checkWinner(west[10], west[11]);
		let rnd64wMatch7Winner = checkWinner(west[12], west[13]);
		let rnd64wMatch8Winner = checkWinner(west[14], west[15]);
		const rnd64wArr = [rnd64wMatch1Winner, rnd64wMatch2Winner, rnd64wMatch3Winner, rnd64wMatch4Winner, rnd64wMatch5Winner, rnd64wMatch6Winner, rnd64wMatch7Winner, rnd64wMatch8Winner];
		let w64box = 9;
		for (let i = 0; i < rnd64wArr.length; i++) {
			document.getElementById(`c2s${w64box}`).textContent = rnd64wArr[i].name;
			w64box++;
		}
		// Round of 32
		let rnd32wMatch1Winner = checkWinner(rnd64wMatch1Winner, rnd64wMatch2Winner);
		let rnd32wMatch2Winner = checkWinner(rnd64wMatch3Winner, rnd64wMatch4Winner);
		let rnd32wMatch3Winner = checkWinner(rnd64wMatch5Winner, rnd64wMatch6Winner);
		let rnd32wMatch4Winner = checkWinner(rnd64wMatch7Winner, rnd64wMatch8Winner);
		const rnd32wArr = [rnd32wMatch1Winner, rnd32wMatch2Winner, rnd32wMatch3Winner, rnd32wMatch4Winner];
		let w32box = 5;
		for (let i = 0; i < rnd32wArr.length; i++) {
			document.getElementById(`c3s${w32box}`).textContent = rnd32wArr[i].name;
			w32box++;
		}
		// Sweet 16
		let swt16wMatch1Winner = checkWinner(rnd32wMatch1Winner, rnd32wMatch2Winner);
		document.getElementById("c4s3").textContent = swt16wMatch1Winner.name;
		let swt16wMatch2Winner = checkWinner(rnd32wMatch3Winner, rnd32wMatch4Winner);
		document.getElementById("c4s4").textContent = swt16wMatch2Winner.name;
		// Elite 8
		let elt8wWinner = checkWinner(swt16wMatch1Winner, swt16wMatch2Winner);
		document.getElementById("c5s2").textContent = elt8wWinner.name;
		return elt8wWinner;
	};

	const getEastWinner = () => {
		// Round of 64
		let rnd64eMatch1Winner = checkWinner(east[0], east[1]);
		let rnd64eMatch2Winner = checkWinner(east[2], east[3]);
		let rnd64eMatch3Winner = checkWinner(east[4], east[5]);
		let rnd64eMatch4Winner = checkWinner(east[6], east[7]);
		let rnd64eMatch5Winner = checkWinner(east[8], east[9]);
		let rnd64eMatch6Winner = checkWinner(east[10], east[11]);
		let rnd64eMatch7Winner = checkWinner(east[12], east[13]);
		let rnd64eMatch8Winner = checkWinner(east[14], east[15]);
		const rnd64eArr = [rnd64eMatch1Winner, rnd64eMatch2Winner, rnd64eMatch3Winner, rnd64eMatch4Winner, rnd64eMatch5Winner, rnd64eMatch6Winner, rnd64eMatch7Winner, rnd64eMatch8Winner];
		let e64box = 1;
		for (let i = 0; i < rnd64eArr.length; i++) {
			document.getElementById(`c2s${e64box}`).textContent = rnd64eArr[i].name;
			e64box++;
		}
		// Round of 32
		let rnd32eMatch1Winner = checkWinner(rnd64eMatch1Winner, rnd64eMatch2Winner);
		let rnd32eMatch2Winner = checkWinner(rnd64eMatch3Winner, rnd64eMatch4Winner);
		let rnd32eMatch3Winner = checkWinner(rnd64eMatch5Winner, rnd64eMatch6Winner);
		let rnd32eMatch4Winner = checkWinner(rnd64eMatch7Winner, rnd64eMatch8Winner);
		const rnd32eArr = [rnd32eMatch1Winner, rnd32eMatch2Winner, rnd32eMatch3Winner, rnd32eMatch4Winner];
		let e32box = 1;
		for (let i = 0; i < rnd32eArr.length; i++) {
			document.getElementById(`c3s${e32box}`).textContent = rnd32eArr[i].name;
			e32box++;
		}
		// Sweet 16
		let swt16eMatch1Winner = checkWinner(rnd32eMatch1Winner, rnd32eMatch2Winner);
		document.getElementById("c4s1").textContent = swt16eMatch1Winner.name;
		let swt16eMatch2Winner = checkWinner(rnd32eMatch3Winner, rnd32eMatch4Winner);
		document.getElementById("c4s2").textContent = swt16eMatch2Winner.name;
		// Elite 8
		let elt8eWinner = checkWinner(swt16eMatch1Winner, swt16eMatch2Winner);
		document.getElementById("c5s1").textContent = elt8eWinner.name;
		return elt8eWinner;
	};

	const getSouthWinner = () => {
		// Round of 64
		let rnd64sMatch1Winner = checkWinner(south[0], south[1]);
		let rnd64sMatch2Winner = checkWinner(south[2], south[3]);
		let rnd64sMatch3Winner = checkWinner(south[4], south[5]);
		let rnd64sMatch4Winner = checkWinner(south[6], south[7]);
		let rnd64sMatch5Winner = checkWinner(south[8], south[9]);
		let rnd64sMatch6Winner = checkWinner(south[10], south[11]);
		let rnd64sMatch7Winner = checkWinner(south[12], south[13]);
		let rnd64sMatch8Winner = checkWinner(south[14], south[15]);
		const rnd64sArr = [rnd64sMatch1Winner, rnd64sMatch2Winner, rnd64sMatch3Winner, rnd64sMatch4Winner, rnd64sMatch5Winner, rnd64sMatch6Winner, rnd64sMatch7Winner, rnd64sMatch8Winner];
		let s64box = 1;
		for (let i = 0; i < rnd64sArr.length; i++) {
			document.getElementById(`c10s${s64box}`).textContent = rnd64sArr[i].name;
			s64box++;
		}
		// Round of 32
		let rnd32sMatch1Winner = checkWinner(rnd64sMatch1Winner, rnd64sMatch2Winner);
		let rnd32sMatch2Winner = checkWinner(rnd64sMatch3Winner, rnd64sMatch4Winner);
		let rnd32sMatch3Winner = checkWinner(rnd64sMatch5Winner, rnd64sMatch6Winner);
		let rnd32sMatch4Winner = checkWinner(rnd64sMatch7Winner, rnd64sMatch8Winner);
		const rnd32sArr = [rnd32sMatch1Winner, rnd32sMatch2Winner, rnd32sMatch3Winner, rnd32sMatch4Winner];
		let s32box = 1;
		for (let i = 0; i < rnd32sArr.length; i++) {
			document.getElementById(`c9s${s32box}`).textContent = rnd32sArr[i].name;
			s32box++;
		}
		// Sweet 16
		let swt16sMatch1Winner = checkWinner(rnd32sMatch1Winner, rnd32sMatch2Winner);
		document.getElementById("c8s1").textContent = swt16sMatch1Winner.name;
		let swt16sMatch2Winner = checkWinner(rnd32sMatch3Winner, rnd32sMatch4Winner);
		document.getElementById("c8s2").textContent = swt16sMatch2Winner.name;
		// Elite 8
		let elt8sWinner = checkWinner(swt16sMatch1Winner, swt16sMatch2Winner);
		document.getElementById("c7s1").textContent = elt8sWinner.name;
		return elt8sWinner;
	};

	const getMWestWinner = () => {
		// Round of 64
		let rnd64mwMatch1Winner = checkWinner(mwest[0], mwest[1]);
		let rnd64mwMatch2Winner = checkWinner(mwest[2], mwest[3]);
		let rnd64mwMatch3Winner = checkWinner(mwest[4], mwest[5]);
		let rnd64mwMatch4Winner = checkWinner(mwest[6], mwest[7]);
		let rnd64mwMatch5Winner = checkWinner(mwest[8], mwest[9]);
		let rnd64mwMatch6Winner = checkWinner(mwest[10], mwest[11]);
		let rnd64mwMatch7Winner = checkWinner(mwest[12], mwest[13]);
		let rnd64mwMatch8Winner = checkWinner(mwest[14], mwest[15]);
		const rnd64mwArr = [rnd64mwMatch1Winner, rnd64mwMatch2Winner, rnd64mwMatch3Winner, rnd64mwMatch4Winner, rnd64mwMatch5Winner, rnd64mwMatch6Winner, rnd64mwMatch7Winner, rnd64mwMatch8Winner];
		let mw64box = 9;
		for (let i = 0; i < rnd64mwArr.length; i++) {
			document.getElementById(`c10s${mw64box}`).textContent = rnd64mwArr[i].name;
			mw64box++;
		}
		// Round of 32
		let rnd32mwMatch1Winner = checkWinner(rnd64mwMatch1Winner, rnd64mwMatch2Winner);
		let rnd32mwMatch2Winner = checkWinner(rnd64mwMatch3Winner, rnd64mwMatch4Winner);
		let rnd32mwMatch3Winner = checkWinner(rnd64mwMatch5Winner, rnd64mwMatch6Winner);
		let rnd32mwMatch4Winner = checkWinner(rnd64mwMatch7Winner, rnd64mwMatch8Winner);
		const rnd32mwArr = [rnd32mwMatch1Winner, rnd32mwMatch2Winner, rnd32mwMatch3Winner, rnd32mwMatch4Winner];
		let mw32box = 5;
		for (let i = 0; i < rnd32mwArr.length; i++) {
			document.getElementById(`c9s${mw32box}`).textContent = rnd32mwArr[i].name;
			mw32box++;
		}
		// Sweet 16
		let swt16mwMatch1Winner = checkWinner(rnd32mwMatch1Winner, rnd32mwMatch2Winner);
		document.getElementById("c8s3").textContent = swt16mwMatch1Winner.name;
		let swt16mwMatch2Winner = checkWinner(rnd32mwMatch3Winner, rnd32mwMatch4Winner);
		document.getElementById("c8s4").textContent = swt16mwMatch2Winner.name;
		// Elite 8
		let elt8mwWinner = checkWinner(swt16mwMatch1Winner, swt16mwMatch2Winner);
		document.getElementById("c7s2").textContent = elt8mwWinner.name;
		return elt8mwWinner;
	};

	let elt8eWinner = getEastWinner();
	let elt8wWinner = getWestWinner();
	let elt8sWinner = getSouthWinner();
	let elt8mwWinner = getMWestWinner();

	// EAST WEST FINAL FOUR MATCH
	let fnl4EW = checkWinner(elt8eWinner, elt8wWinner);
	document.getElementById("c6s1").textContent = fnl4EW.name;
	// SOUTH MIDWEST FINAL FOUR MATCH
	let fnl4SMW = checkWinner(elt8sWinner, elt8mwWinner);
	document.getElementById("c6s2").textContent = fnl4SMW.name;
	// CHAMPIONSHIP MATCH
	let champ = checkWinner(fnl4EW, fnl4SMW);
	document.getElementById("c6s0").textContent = champ.name;
});
