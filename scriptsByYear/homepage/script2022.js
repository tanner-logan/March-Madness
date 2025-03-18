import {
	Memphis,
	BoiseSt,
	Michigan,
	ColoradoSt,
	LoyolaIL,
	OhioSt,
	JacksonvilleSt,
	Auburn,
	MontanaSt,
	TexasTech,
	Yale,
	Purdue,
	NorthCarolina,
	Marquette,
	Delaware,
	Villanova,
	Miami,
	USC,
	NotreDame,
	Alabama,
	VirginiaTech,
	Texas,
	Chattanooga,
	Illinois,
	CalSt,
	Duke,
	IowaSt,
	LSU,
	WrightSt,
	Arizona,
	UAB,
	Houston,
	Davidson,
	MichiganSt,
	Colgate,
	Wisconsin,
	TCU,
	SetonHall,
	SouthDakotaSt,
	Providence,
	NorfolkSt,
	Baylor,
	Longwood,
	Tennessee,
	Iowa,
	Richmond,
	GeorgiaSt,
	Gonzaga,
	NewMexicoSt,
	UConn,
	SaintPeters,
	Kentucky,
	Indiana,
	SaintMarys,
	SanDiegoSt,
	Creighton,
	Vermont,
	Arkansas,
	Akron,
	UCLA,
	SanFrancisco,
	MurraySt,
	TexasSouthern,
	Kansas,
} from "./teams.js";

document.querySelector(".Submit").addEventListener("click", function () {
	try {
		let getTeam1 = document.querySelector(".team1").value;
		let getTeam2 = document.querySelector(".team2").value;
		let currTeam1 = "";
		let currTeam2 = "";
		let teamList = [
			Memphis,
			BoiseSt,
			Michigan,
			ColoradoSt,
			LoyolaIL,
			OhioSt,
			JacksonvilleSt,
			Auburn,
			MontanaSt,
			TexasTech,
			Yale,
			Purdue,
			NorthCarolina,
			Marquette,
			Delaware,
			Villanova,
			Miami,
			USC,
			NotreDame,
			Alabama,
			VirginiaTech,
			Texas,
			Chattanooga,
			Illinois,
			CalSt,
			Duke,
			IowaSt,
			LSU,
			WrightSt,
			Arizona,
			UAB,
			Houston,
			Davidson,
			MichiganSt,
			Colgate,
			Wisconsin,
			TCU,
			SetonHall,
			SouthDakotaSt,
			Providence,
			NorfolkSt,
			Baylor,
			Longwood,
			Tennessee,
			Iowa,
			Richmond,
			GeorgiaSt,
			Gonzaga,
			NewMexicoSt,
			UConn,
			SaintPeters,
			Kentucky,
			Indiana,
			SaintMarys,
			SanDiegoSt,
			Creighton,
			Vermont,
			Arkansas,
			Akron,
			UCLA,
			SanFrancisco,
			MurraySt,
			TexasSouthern,
			Kansas,
		];
		for (let i = 0; i < teamList.length; i++) {
			if (getTeam1 == teamList[i].name) {
				currTeam1 = teamList[i];
			} else if (getTeam2 == teamList[i].name) {
				currTeam2 = teamList[i];
			}
		}

		const game = {
			team1: currTeam1.name,
			team2: currTeam2.name,
			record: [currTeam1.record, currTeam2.record],
			ftAttPG: [currTeam1.ftAttPG, currTeam2.ftAttPG],
			ftPercentage: [currTeam1.ftPercentage, currTeam2.ftPercentage],
			fgPercentage: [currTeam1.fgPercentage, currTeam2.fgPercentage],
			toPG: [currTeam1.toPG, currTeam2.toPG],
			oRebPG: [currTeam1.oRebPG, currTeam2.oRebPG],
			dRebPG: [currTeam1.dRebPG, currTeam2.dRebPG],
			ThreePTPG: [currTeam1.ThreePTPG, currTeam2.ThreePTPG],
			SOS: [currTeam1.SOS, currTeam2.SOS],
			stealsPG: [currTeam1.stealsPG, currTeam2.stealsPG],
			blocksPG: [currTeam1.blocksPG, currTeam2.blocksPG],
			foulsPG: [currTeam1.foulsPG, currTeam2.foulsPG],
			assistsPG: [currTeam1.assistsPG, currTeam2.assistsPG],
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

		const team1Pct = winPct(team1RecordArr);
		const team2Pct = winPct(team2RecordArr);

		if (team1Pct > team2Pct) {
			const pctDiff = team1Pct - team2Pct;
			switch (true) {
				case pctDiff >= 0.7:
					team1Score += 0.8;
					break;
				case pctDiff >= 0.5:
					team1Score += 0.7;
					break;
				case pctDiff >= 0.4:
					team1Score += 0.6;
					break;
				case pctDiff >= 0.3:
					team1Score += 0.5;
					break;
				case pctDiff >= 0.2:
					team1Score += 0.4;
					break;
				case pctDiff >= 0.1:
					team1Score += 0.3;
					break;
				case pctDiff >= 0.05:
					team1Score += 0.2;
					break;
			}
		} else if (team2Pct > team1Pct) {
			const pctDiff = team2Pct - team1Pct;
			switch (true) {
				case pctDiff >= 0.7:
					team2Score += 0.8;
					break;
				case pctDiff >= 0.5:
					team2Score += 0.7;
					break;
				case pctDiff >= 0.4:
					team2Score += 0.6;
					break;
				case pctDiff >= 0.3:
					team2Score += 0.5;
					break;
				case pctDiff >= 0.2:
					team2Score += 0.4;
					break;
				case pctDiff >= 0.1:
					team2Score += 0.3;
					break;
				case pctDiff >= 0.05:
					team2Score += 0.2;
					break;
			}
		}

		// TEAM FREE THROW ATTEMPTS PER GAME
		const team1FAPG = Number(game.ftAttPG[0]);
		const team2FAPG = Number(game.ftAttPG[1]);

		if (team1FAPG > team2FAPG) {
			const FAPGdiff = team1FAPG - team2FAPG;
			switch (true) {
				case FAPGdiff >= 14:
					team1Score += 0.8;
					break;
				case FAPGdiff >= 12:
					team1Score += 0.7;
					break;
				case FAPGdiff >= 10:
					team1Score += 0.6;
					break;
				case FAPGdiff >= 8:
					team1Score += 0.5;
					break;
				case FAPGdiff >= 6:
					team1Score += 0.4;
					break;
				case FAPGdiff >= 4:
					team1Score += 0.3;
					break;
				case FAPGdiff >= 2:
					team1Score += 0.2;
					break;
				case FAPGdiff >= 1:
					team1Score += 0.1;
					break;
				case FAPGdiff >= 0.5:
					team1Score += 0.075;
					break;
				case FAPGdiff >= 0.25:
					team1Score += 0.05;
					break;
			}
		} else if (team2FAPG > team1FAPG) {
			const FAPGdiff = team2FAPG - team1FAPG;
			switch (true) {
				case FAPGdiff >= 14:
					team2Score += 0.8;
					break;
				case FAPGdiff >= 12:
					team2Score += 0.7;
					break;
				case FAPGdiff >= 10:
					team2Score += 0.6;
					break;
				case FAPGdiff >= 8:
					team2Score += 0.5;
					break;
				case FAPGdiff >= 6:
					team2Score += 0.4;
					break;
				case FAPGdiff >= 4:
					team2Score += 0.3;
					break;
				case FAPGdiff >= 2:
					team2Score += 0.2;
					break;
				case FAPGdiff >= 1:
					team2Score += 0.1;
					break;
				case FAPGdiff >= 0.5:
					team2Score += 0.075;
					break;
				case FAPGdiff >= 0.25:
					team2Score += 0.05;
					break;
			}
		}

		// TEAM FIELD GOAL PERCENTAGE
		const team1FGpct = Number(game.fgPercentage[0]);
		const team2FGpct = Number(game.fgPercentage[1]);

		if (team1FGpct > team2FGpct) {
			const FGpctDiff = team1FGpct - team2FGpct;
			switch (true) {
				case FGpctDiff >= 15:
					team1Score += 1.5;
					break;
				case FGpctDiff >= 12:
					team1Score += 1.4;
					break;
				case FGpctDiff >= 10:
					team1Score += 1.3;
					break;
				case FGpctDiff >= 8:
					team1Score += 1.2;
					break;
				case FGpctDiff >= 6:
					team1Score += 1;
					break;
				case FGpctDiff >= 4:
					team1Score += 0.8;
					break;
				case FGpctDiff >= 2:
					team1Score += 0.6;
					break;
				case FGpctDiff >= 1:
					team1Score += 0.4;
					break;
				case FGpctDiff >= 0.5:
					team1Score += 0.2;
					break;
				case FGpctDiff >= 0.25:
					team1Score += 0.1;
					break;
			}
		} else if (team2FGpct > team1FGpct) {
			const FGpctDiff = team2FGpct - team1FGpct;
			switch (true) {
				case FGpctDiff >= 15:
					team2Score += 1.5;
					break;
				case FGpctDiff >= 12:
					team2Score += 1.4;
					break;
				case FGpctDiff >= 10:
					team2Score += 1.3;
					break;
				case FGpctDiff >= 8:
					team2Score += 1.2;
					break;
				case FGpctDiff >= 6:
					team2Score += 1;
					break;
				case FGpctDiff >= 4:
					team2Score += 0.8;
					break;
				case FGpctDiff >= 2:
					team2Score += 0.6;
					break;
				case FGpctDiff >= 1:
					team2Score += 0.4;
					break;
				case FGpctDiff >= 0.5:
					team2Score += 0.2;
					break;
				case FGpctDiff >= 0.25:
					team2Score += 0.1;
					break;
			}
		}

		// TURNOVERS PER GAME
		const team1toPG = Number(game.toPG[0]);
		const team2toPG = Number(game.toPG[1]);

		if (team1toPG > team2toPG) {
			const TODiff = team1toPG - team2toPG;
			switch (true) {
				case TODiff >= 8:
					team2Score += 0.8;
					break;
				case TODiff >= 7:
					team2Score += 0.7;
					break;
				case TODiff >= 6:
					team2Score += 0.6;
					break;
				case TODiff >= 5:
					team2Score += 0.5;
					break;
				case TODiff >= 4:
					team2Score += 0.4;
					break;
				case TODiff >= 3:
					team2Score += 0.3;
					break;
				case TODiff >= 2:
					team2Score += 0.2;
					break;
				case TODiff >= 1:
					team2Score += 0.1;
					break;
				case TODiff >= 0.5:
					team2Score += 0.075;
					break;
				case TODiff >= 0.25:
					team2Score += 0.05;
					break;
			}
		} else if (team2toPG > team1toPG) {
			const TODiff = team2toPG - team1toPG;
			switch (true) {
				case TODiff >= 8:
					team1Score += 0.8;
					break;
				case TODiff >= 7:
					team1Score += 0.7;
					break;
				case TODiff >= 6:
					team1Score += 0.6;
					break;
				case TODiff >= 5:
					team1Score += 0.5;
					break;
				case TODiff >= 4:
					team1Score += 0.4;
					break;
				case TODiff >= 3:
					team1Score += 0.3;
					break;
				case TODiff >= 2:
					team1Score += 0.2;
					break;
				case TODiff >= 1:
					team1Score += 0.1;
					break;
				case TODiff >= 0.5:
					team1Score += 0.075;
					break;
				case TODiff >= 0.25:
					team1Score += 0.05;
					break;
			}
		}

		// OFFENSIVE REBOUNDS PER GAME
		const team1oRebPG = Number(game.oRebPG[0]);
		const team2oRebPG = Number(game.oRebPG[1]);

		if (team1oRebPG > team2oRebPG) {
			const oRebPGDiff = team1oRebPG - team2oRebPG;
			switch (true) {
				case oRebPGDiff >= 11:
					team1Score += 0.8;
					break;
				case oRebPGDiff >= 9:
					team1Score += 0.7;
					break;
				case oRebPGDiff >= 7:
					team1Score += 0.6;
					break;
				case oRebPGDiff >= 6:
					team1Score += 0.5;
					break;
				case oRebPGDiff >= 5:
					team1Score += 0.4;
					break;
				case oRebPGDiff >= 4:
					team1Score += 0.3;
					break;
				case oRebPGDiff >= 3:
					team1Score += 0.2;
					break;
				case oRebPGDiff >= 2:
					team1Score += 0.1;
					break;
				case oRebPGDiff >= 1:
					team1Score += 0.075;
					break;
				case oRebPGDiff >= 0.5:
					team1Score += 0.05;
					break;
			}
		} else if (team2oRebPG > team1oRebPG) {
			const oRebPGDiff = team2oRebPG - team1oRebPG;
			switch (true) {
				case oRebPGDiff >= 11:
					team2Score += 0.8;
					break;
				case oRebPGDiff >= 9:
					team2Score += 0.7;
					break;
				case oRebPGDiff >= 7:
					team2Score += 0.6;
					break;
				case oRebPGDiff >= 6:
					team2Score += 0.5;
					break;
				case oRebPGDiff >= 5:
					team2Score += 0.4;
					break;
				case oRebPGDiff >= 4:
					team2Score += 0.3;
					break;
				case oRebPGDiff >= 3:
					team2Score += 0.2;
					break;
				case oRebPGDiff >= 2:
					team2Score += 0.1;
					break;
				case oRebPGDiff >= 1:
					team2Score += 0.075;
					break;
				case oRebPGDiff >= 0.5:
					team2Score += 0.05;
					break;
			}
		}

		// DEFENSIVE REBOUNDS PER GAME
		const team1dRebPG = Number(game.dRebPG[0]);
		const team2dRebPG = Number(game.dRebPG[1]);

		if (team1dRebPG > team2dRebPG) {
			const dRebPGDiff = team1dRebPG - team2dRebPG;
			switch (true) {
				case dRebPGDiff >= 11:
					team1Score += 0.8;
					break;
				case dRebPGDiff >= 9:
					team1Score += 0.7;
					break;
				case dRebPGDiff >= 7:
					team1Score += 0.6;
					break;
				case dRebPGDiff >= 6:
					team1Score += 0.5;
					break;
				case dRebPGDiff >= 5:
					team1Score += 0.4;
					break;
				case dRebPGDiff >= 4:
					team1Score += 0.3;
					break;
				case dRebPGDiff >= 3:
					team1Score += 0.2;
					break;
				case dRebPGDiff >= 2:
					team1Score += 0.1;
					break;
				case dRebPGDiff >= 1:
					team1Score += 0.075;
					break;
				case dRebPGDiff >= 0.5:
					team1Score += 0.05;
					break;
			}
		} else if (team2dRebPG > team1dRebPG) {
			const dRebPGDiff = team2dRebPG - team1dRebPG;
			switch (true) {
				case dRebPGDiff >= 11:
					team2Score += 0.8;
					break;
				case dRebPGDiff >= 9:
					team2Score += 0.7;
					break;
				case dRebPGDiff >= 7:
					team2Score += 0.6;
					break;
				case dRebPGDiff >= 6:
					team2Score += 0.5;
					break;
				case dRebPGDiff >= 5:
					team2Score += 0.4;
					break;
				case dRebPGDiff >= 4:
					team2Score += 0.3;
					break;
				case dRebPGDiff >= 3:
					team2Score += 0.2;
					break;
				case dRebPGDiff >= 2:
					team2Score += 0.1;
					break;
				case dRebPGDiff >= 1:
					team2Score += 0.075;
					break;
				case dRebPGDiff >= 0.5:
					team2Score += 0.05;
					break;
			}
		}

		// 3PT PER GAME
		const team13PTPG = Number(game.ThreePTPG[0]);
		const team23PTPG = Number(game.ThreePTPG[1]);

		if (team13PTPG > team23PTPG) {
			const ThreePTDiff = team13PTPG - team23PTPG;
			switch (true) {
				case ThreePTDiff >= 9:
					team1Score += 0.8;
					break;
				case ThreePTDiff >= 8:
					team1Score += 0.7;
					break;
				case ThreePTDiff >= 7:
					team1Score += 0.6;
					break;
				case ThreePTDiff >= 6:
					team1Score += 0.5;
					break;
				case ThreePTDiff >= 5:
					team1Score += 0.4;
					break;
				case ThreePTDiff >= 4:
					team1Score += 0.3;
					break;
				case ThreePTDiff >= 3:
					team1Score += 0.2;
					break;
				case ThreePTDiff >= 2:
					team1Score += 0.1;
					break;
				case ThreePTDiff >= 1:
					team1Score += 0.075;
					break;
				case ThreePTDiff >= 0.5:
					team1Score += 0.05;
					break;
			}
		} else if (team23PTPG > team13PTPG) {
			const ThreePTDiff = team23PTPG - team13PTPG;
			switch (true) {
				case ThreePTDiff >= 9:
					team2Score += 0.8;
					break;
				case ThreePTDiff >= 8:
					team2Score += 0.7;
					break;
				case ThreePTDiff >= 7:
					team2Score += 0.6;
					break;
				case ThreePTDiff >= 6:
					team2Score += 0.5;
					break;
				case ThreePTDiff >= 5:
					team2Score += 0.4;
					break;
				case ThreePTDiff >= 4:
					team2Score += 0.3;
					break;
				case ThreePTDiff >= 3:
					team2Score += 0.2;
					break;
				case ThreePTDiff >= 2:
					team2Score += 0.1;
					break;
				case ThreePTDiff >= 1:
					team2Score += 0.075;
					break;
				case ThreePTDiff >= 0.5:
					team2Score += 0.05;
					break;
			}
		}

		const team1SOS = Number(game.SOS[0]);
		const team2SOS = Number(game.SOS[1]);
		if (team1SOS > team2SOS) {
			const SOSDiff = team1SOS - team2SOS;
			switch (true) {
				case SOSDiff >= 18:
					team1Score += 1.2;
					break;
				case SOSDiff >= 16:
					team1Score += 1.1;
					break;
				case SOSDiff >= 14:
					team1Score += 1.0;
					break;
				case SOSDiff >= 12:
					team1Score += 0.9;
					break;
				case SOSDiff >= 10:
					team1Score += 0.8;
					break;
				case SOSDiff >= 8:
					team1Score += 0.7;
					break;
				case SOSDiff >= 6:
					team1Score += 0.5;
					break;
				case SOSDiff >= 5:
					team1Score += 0.4;
					break;
				case SOSDiff >= 4:
					team1Score += 0.3;
					break;
				case SOSDiff >= 3:
					team1Score += 0.2;
					break;
				case SOSDiff >= 2:
					team1Score += 0.1;
					break;
				case SOSDiff >= 1:
					team1Score += 0.05;
					break;
				case SOSDiff >= 0.5:
					team1Score += 0.025;
					break;
			}
		} else if (team2SOS > team1SOS) {
			const SOSDiff = team2SOS - team1SOS;
			switch (true) {
				case SOSDiff >= 18:
					team2Score += 1.2;
					break;
				case SOSDiff >= 16:
					team2Score += 1.1;
					break;
				case SOSDiff >= 14:
					team2Score += 1.0;
					break;
				case SOSDiff >= 12:
					team2Score += 0.9;
					break;
				case SOSDiff >= 10:
					team2Score += 0.8;
					break;
				case SOSDiff >= 8:
					team2Score += 0.7;
					break;
				case SOSDiff >= 6:
					team2Score += 0.5;
					break;
				case SOSDiff >= 5:
					team2Score += 0.4;
					break;
				case SOSDiff >= 4:
					team2Score += 0.3;
					break;
				case SOSDiff >= 3:
					team2Score += 0.2;
					break;
				case SOSDiff >= 2:
					team2Score += 0.1;
					break;
				case SOSDiff >= 1:
					team2Score += 0.05;
					break;
				case SOSDiff >= 0.5:
					team2Score += 0.025;
					break;
			}
		}

		const team1stealsPG = Number(game.stealsPG[0]);
		const team2stealsPG = Number(game.stealsPG[1]);
		if (team1stealsPG > team2stealsPG) {
			const stealsDiff = team1stealsPG - team2stealsPG;
			switch (true) {
				case stealsDiff >= 7:
					team1Score += 0.8;
					break;
				case stealsDiff >= 6:
					team1Score += 0.7;
					break;
				case stealsDiff >= 5.5:
					team1Score += 0.6;
					break;
				case stealsDiff >= 5:
					team1Score += 0.5;
					break;
				case stealsDiff >= 4.5:
					team1Score += 0.4;
					break;
				case stealsDiff >= 4:
					team1Score += 0.3;
					break;
				case stealsDiff >= 3.5:
					team1Score += 0.2;
					break;
				case stealsDiff >= 3:
					team1Score += 0.1;
					break;
				case stealsDiff >= 2:
					team1Score += 0.075;
					break;
				case stealsDiff >= 1.5:
					team1Score += 0.05;
					break;
				case stealsDiff >= 1:
					team1Score += 0.025;
					break;
				case stealsDiff >= 0.5:
					team1Score += 0.015;
					break;
				case stealsDiff >= 0.25:
					team1Score += 0.005;
					break;
			}
		} else if (team2stealsPG > team1stealsPG) {
			const stealsDiff = team2stealsPG - team1stealsPG;
			switch (true) {
				case stealsDiff >= 7:
					team2Score += 0.8;
					break;
				case stealsDiff >= 6:
					team2Score += 0.7;
					break;
				case stealsDiff >= 5.5:
					team2Score += 0.6;
					break;
				case stealsDiff >= 5:
					team2Score += 0.5;
					break;
				case stealsDiff >= 4.5:
					team2Score += 0.4;
					break;
				case stealsDiff >= 4:
					team2Score += 0.3;
					break;
				case stealsDiff >= 3.5:
					team2Score += 0.2;
					break;
				case stealsDiff >= 3:
					team2Score += 0.1;
					break;
				case stealsDiff >= 2:
					team2Score += 0.075;
					break;
				case stealsDiff >= 1.5:
					team2Score += 0.05;
					break;
				case stealsDiff >= 1:
					team2Score += 0.025;
					break;
				case stealsDiff >= 0.5:
					team2Score += 0.015;
					break;
				case stealsDiff >= 0.25:
					team2Score += 0.005;
					break;
			}
		}

		const team1blocksPG = Number(game.blocksPG[0]);
		const team2blocksPG = Number(game.blocksPG[1]);
		if (team1blocksPG > team2blocksPG) {
			const blocksDiff = team1blocksPG - team2blocksPG;
			switch (true) {
				case blocksDiff >= 5:
					team1Score += 0.7;
					break;
				case blocksDiff >= 4.5:
					team1Score += 0.6;
					break;
				case blocksDiff >= 4:
					team1Score += 0.5;
					break;
				case blocksDiff >= 3.5:
					team1Score += 0.4;
					break;
				case blocksDiff >= 3:
					team1Score += 0.3;
					break;
				case blocksDiff >= 2.5:
					team1Score += 0.2;
					break;
				case blocksDiff >= 2:
					team1Score += 0.1;
					break;
				case blocksDiff >= 1.75:
					team1Score += 0.075;
					break;
				case blocksDiff >= 1.5:
					team1Score += 0.05;
					break;
				case blocksDiff >= 1.25:
					team1Score += 0.025;
					break;
				case blocksDiff >= 1:
					team1Score += 0.015;
					break;
				case blocksDiff >= 0.5:
					team1Score += 0.005;
					break;
				case blocksDiff >= 0.25:
					team1Score += 0.0025;
					break;
			}
		} else if (team2blocksPG > team1blocksPG) {
			const blocksDiff = team2blocksPG - team1blocksPG;
			switch (true) {
				case blocksDiff >= 5:
					team2Score += 0.7;
					break;
				case blocksDiff >= 4.5:
					team2Score += 0.6;
					break;
				case blocksDiff >= 4:
					team2Score += 0.5;
					break;
				case blocksDiff >= 3.5:
					team2Score += 0.4;
					break;
				case blocksDiff >= 3:
					team2Score += 0.3;
					break;
				case blocksDiff >= 2.5:
					team2Score += 0.2;
					break;
				case blocksDiff >= 2:
					team2Score += 0.1;
					break;
				case blocksDiff >= 1.75:
					team2Score += 0.075;
					break;
				case blocksDiff >= 1.5:
					team2Score += 0.05;
					break;
				case blocksDiff >= 1.25:
					team2Score += 0.025;
					break;
				case blocksDiff >= 1:
					team2Score += 0.015;
					break;
				case blocksDiff >= 0.5:
					team2Score += 0.005;
					break;
				case blocksDiff >= 0.25:
					team2Score += 0.0025;
					break;
			}
		}

		const team1FTPercentage = Number(game.ftPercentage[0]);
		const team2FTPercentage = Number(game.ftPercentage[1]);
		if (team1FTPercentage > team2FTPercentage) {
			const ftPercentageDiff = team1FTPercentage - team2FTPercentage;
			switch (true) {
				case ftPercentageDiff >= 19:
					team1Score += 1.0;
					break;
				case ftPercentageDiff >= 16:
					team1Score += 0.9;
					break;
				case ftPercentageDiff >= 13:
					team1Score += 0.8;
					break;
				case ftPercentageDiff >= 10:
					team1Score += 0.7;
					break;
				case ftPercentageDiff >= 7:
					team1Score += 0.6;
					break;
				case ftPercentageDiff >= 5:
					team1Score += 0.5;
					break;
				case ftPercentageDiff >= 4:
					team1Score += 0.4;
					break;
				case ftPercentageDiff >= 3:
					team1Score += 0.3;
					break;
				case ftPercentageDiff >= 2.5:
					team1Score += 0.2;
					break;
				case ftPercentageDiff >= 2:
					team1Score += 0.1;
					break;
				case ftPercentageDiff >= 1.5:
					team1Score += 0.075;
					break;
				case ftPercentageDiff >= 1:
					team1Score += 0.05;
					break;
				case ftPercentageDiff >= 0.5:
					team1Score += 0.025;
					break;
			}
		} else if (team2FTPercentage > team1FTPercentage) {
			const ftPercentageDiff = team2FTPercentage - team1FTPercentage;
			switch (true) {
				case ftPercentageDiff >= 19:
					team2Score += 1.0;
					break;
				case ftPercentageDiff >= 16:
					team2Score += 0.9;
					break;
				case ftPercentageDiff >= 13:
					team2Score += 0.8;
					break;
				case ftPercentageDiff >= 10:
					team2Score += 0.7;
					break;
				case ftPercentageDiff >= 7:
					team2Score += 0.6;
					break;
				case ftPercentageDiff >= 5:
					team2Score += 0.5;
					break;
				case ftPercentageDiff >= 4:
					team2Score += 0.4;
					break;
				case ftPercentageDiff >= 3:
					team2Score += 0.3;
					break;
				case ftPercentageDiff >= 2.5:
					team2Score += 0.2;
					break;
				case ftPercentageDiff >= 2:
					team2Score += 0.1;
					break;
				case ftPercentageDiff >= 1.5:
					team2Score += 0.075;
					break;
				case ftPercentageDiff >= 1:
					team2Score += 0.05;
					break;
				case ftPercentageDiff >= 0.5:
					team2Score += 0.025;
					break;
			}
		}

		const team1FoulsPG = Number(game.foulsPG[0]);
		const team2FoulsPG = Number(game.foulsPG[1]);
		if (team1FoulsPG > team2FoulsPG) {
			const foulsDiff = team1FoulsPG - team2FoulsPG;
			switch (true) {
				case foulsDiff >= 11:
					team2Score += 1.0;
					break;
				case foulsDiff >= 9:
					team2Score += 0.9;
					break;
				case foulsDiff >= 7:
					team2Score += 0.7;
					break;
				case foulsDiff >= 5:
					team2Score += 0.5;
					break;
				case foulsDiff >= 3:
					team2Score += 0.3;
					break;
				case foulsDiff >= 2:
					team2Score += 0.2;
					break;
				case foulsDiff >= 1:
					team2Score += 0.1;
					break;
				case foulsDiff >= 0.75:
					team2Score += 0.08;
					break;
				case foulsDiff >= 0.5:
					team2Score += 0.06;
					break;
				case foulsDiff >= 0.25:
					team2Score += 0.045;
					break;
				case foulsDiff >= 0.15:
					team2Score += 0.035;
					break;
				case foulsDiff >= 0.1:
					team2Score += 0.025;
					break;
				case foulsDiff >= 0.05:
					team2Score += 0.015;
					break;
			}
		} else if (team2FoulsPG > team1FoulsPG) {
			const foulsDiff = team2FoulsPG - team1FoulsPG;
			switch (true) {
				case foulsDiff >= 11:
					team1Score += 1.0;
					break;
				case foulsDiff >= 9:
					team1Score += 0.9;
					break;
				case foulsDiff >= 7:
					team1Score += 0.7;
					break;
				case foulsDiff >= 5:
					team1Score += 0.5;
					break;
				case foulsDiff >= 3:
					team1Score += 0.3;
					break;
				case foulsDiff >= 2:
					team1Score += 0.2;
					break;
				case foulsDiff >= 1:
					team1Score += 0.1;
					break;
				case foulsDiff >= 0.75:
					team1Score += 0.08;
					break;
				case foulsDiff >= 0.5:
					team1Score += 0.06;
					break;
				case foulsDiff >= 0.25:
					team1Score += 0.045;
					break;
				case foulsDiff >= 0.15:
					team1Score += 0.035;
					break;
				case foulsDiff >= 0.1:
					team1Score += 0.025;
					break;
				case foulsDiff >= 0.05:
					team1Score += 0.015;
					break;
			}
		}

		const team1assistsPG = Number(game.assistsPG[0]);
		const team2assistsPG = Number(game.assistsPG[1]);
		if (team1assistsPG > team2assistsPG) {
			const assistsDiff = team1assistsPG - team2assistsPG;
			switch (true) {
				case assistsDiff >= 11:
					team1Score += 0.5;
					break;
				case assistsDiff >= 9:
					team1Score += 0.4;
					break;
				case assistsDiff >= 7:
					team1Score += 0.3;
					break;
				case assistsDiff >= 5:
					team1Score += 0.25;
					break;
				case assistsDiff >= 4:
					team1Score += 0.2;
					break;
				case assistsDiff >= 3:
					team1Score += 0.15;
					break;
				case assistsDiff >= 2:
					team1Score += 0.1;
					break;
				case assistsDiff >= 1:
					team1Score += 0.075;
					break;
				case assistsDiff >= 0.5:
					team1Score += 0.05;
					break;
				case assistsDiff >= 0.25:
					team1Score += 0.025;
					break;
			}
		} else if (team2assistsPG > team1assistsPG) {
			const assistsDiff = team2assistsPG - team1assistsPG;
			switch (true) {
				case assistsDiff >= 11:
					team2Score += 0.5;
					break;
				case assistsDiff >= 9:
					team2Score += 0.4;
					break;
				case assistsDiff >= 7:
					team2Score += 0.3;
					break;
				case assistsDiff >= 5:
					team2Score += 0.25;
					break;
				case assistsDiff >= 4:
					team2Score += 0.2;
					break;
				case assistsDiff >= 3:
					team2Score += 0.15;
					break;
				case assistsDiff >= 2:
					team2Score += 0.1;
					break;
				case assistsDiff >= 1:
					team2Score += 0.075;
					break;
				case assistsDiff >= 0.5:
					team2Score += 0.05;
					break;
				case assistsDiff >= 0.25:
					team2Score += 0.025;
					break;
			}
		}

		// CONFIDENCE METER
		let pointDiff = 0;
		switch (true) {
			case team1Score > team2Score:
				pointDiff = team1Score - team2Score;
				switch (true) {
					case pointDiff >= 1.4:
						document.querySelector(".confidence").textContent = "High Confidence";
						document.querySelector(".confidence").style.color = "rgb(44, 248, 146)";
						break;
					case pointDiff >= 0.6:
						document.querySelector(".confidence").textContent = "Medium Confidence";
						document.querySelector(".confidence").style.color = "orange";
						break;
					case pointDiff >= 0:
						document.querySelector(".confidence").textContent = "Low Confidence";
						document.querySelector(".confidence").style.color = "red";
						break;
				}
				break;
			case team1Score < team2Score:
				pointDiff = team2Score - team1Score;
				switch (true) {
					case pointDiff >= 1.4:
						document.querySelector(".confidence").textContent = "High Confidence";
						document.querySelector(".confidence").style.color = "rgb(44, 248, 146)";
						break;
					case pointDiff >= 0.6:
						document.querySelector(".confidence").textContent = "Medium Confidence";
						document.querySelector(".confidence").style.color = "orange";
						break;
					case pointDiff >= 0:
						document.querySelector(".confidence").textContent = "Low Confidence";
						document.querySelector(".confidence").style.color = "red";
						break;
				}
				break;
			case team1Score == team2Score:
				document.querySelector(".confidence").textContent = "Low Confidence";
				document.querySelector(".confidence").style.color = "red";
				break;
		}

		// DECIDE WINNER
		let winner = "Team";
		let tie = false;
		switch (true) {
			case team1Score > team2Score:
				winner = game.team1;
				break;
			case team2Score > team1Score:
				winner = game.team2;
				break;
			case team1Score == team2Score:
				game.fgPercentage[0] > game.fgPercentage[1] ? (winner = game.team1) : (winner = game.team2);
				tie = true;
				break;
		}

		tie ? (document.querySelector(".winner").textContent = `Tie break winner ${winner}`) : (document.querySelector(".winner").textContent = winner);
		console.log(`${game.team1}: ${team1Score}  ${game.team2}: ${team2Score}`);
	} catch (err) {
		document.querySelector(".winner").textContent = err.message;
	}
});
