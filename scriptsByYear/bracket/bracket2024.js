import {
	Purdue,
	MontanaSt,
	UtahSt,
	TXChristian,
	Gonzaga,
	McNeeseSt,
	Kansas,
	Samford,
	SCarolina,
	Oregon,
	Creighton,
	Akron,
	Texas,
	Tennessee,
	StPeters,
	NCarolina,
	Howard,
	MissState,
	MichiganSt,
	StMarys,
	GrdCanyon,
	Alabama,
	ColCharlestn,
	Clemson,
	NewMexico,
	Baylor,
	Colgate,
	Dayton,
	Nevada,
	Arizona,
	LgBeachSt,
	Connecticut,
	Stetson,
	FlaAtlantic,
	Northwestern,
	SanDiegoSt,
	UAB,
	Auburn,
	Yale,
	BYU,
	Duquesne,
	Illinois,
	MoreheadSt,
	WashState,
	Drake,
	IowaSt,
	SDakotaSt,
	Houston,
	Longwood,
	Nebraska,
	TexasAM,
	Wisconsin,
	JamesMad,
	Duke,
	Vermont,
	TexasTech,
	NCState,
	Kentucky,
	Oakland,
	Florida,
	Colorado,
	Marquette,
	WKentucky,
	ColoradoSt,
} from "./teams.js";

document.getElementById("magicbtn").addEventListener("click", function () {
	const mwest = [Purdue, MontanaSt, UtahSt, TXChristian, Gonzaga, McNeeseSt, Kansas, Samford, SCarolina, Oregon, Creighton, Akron, Texas, ColoradoSt, Tennessee, StPeters];
	const west = [NCarolina, Howard, MissState, MichiganSt, StMarys, GrdCanyon, Alabama, ColCharlestn, Clemson, NewMexico, Baylor, Colgate, Dayton, Nevada, Arizona, LgBeachSt];
	const east = [Connecticut, Stetson, FlaAtlantic, Northwestern, SanDiegoSt, UAB, Auburn, Yale, BYU, Duquesne, Illinois, MoreheadSt, WashState, Drake, IowaSt, SDakotaSt];
	const south = [Houston, Longwood, Nebraska, TexasAM, Wisconsin, JamesMad, Duke, Vermont, TexasTech, NCState, Kentucky, Oakland, Florida, Colorado, Marquette, WKentucky];
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
	//
	//
	//
	//
	//
	// SEND ROUND 64 TEAM NAMES TO BRACKET
	let wNum = 17;
	for (let i = 0; i < west.length; i++) {
		// GETS THE SEASON TOTAL FOUL COUNT OF ALL THE TEAMS COMBINED
		totalFouls = totalFouls + Number(west[i].foulsPG);
		// GETS THE SEASON TOTAL FREE THROW PERCENTAGES ADDED UP TO LATER GET AN AVERAGE
		totalFTPercentage = totalFTPercentage + Number(west[i].ftPercentage);
		document.getElementById(`c1s${wNum}`).textContent = west[i].name;
		wNum++;
	}
	let eNum = 1;
	for (let i = 0; i < east.length; i++) {
		// GETS THE SEASON TOTAL FOUL COUNT OF ALL THE TEAMS COMBINED
		totalFouls = totalFouls + Number(east[i].foulsPG);
		// GETS THE SEASON TOTAL FREE THROW PERCENTAGES ADDED UP TO LATER GET AN AVERAGE
		totalFTPercentage = totalFTPercentage + Number(east[i].ftPercentage);
		document.getElementById(`c1s${eNum}`).textContent = east[i].name;
		eNum++;
	}
	let sNum = 1;
	for (let i = 0; i < south.length; i++) {
		// GETS THE SEASON TOTAL FOUL COUNT OF ALL THE TEAMS COMBINED
		totalFouls = totalFouls + Number(south[i].foulsPG);
		// GETS THE SEASON TOTAL FREE THROW PERCENTAGES ADDED UP TO LATER GET AN AVERAGE
		totalFTPercentage = totalFTPercentage + Number(south[i].ftPercentage);
		document.getElementById(`c11s${sNum}`).textContent = south[i].name;
		sNum++;
	}
	let mwNum = 17;
	for (let i = 0; i < mwest.length; i++) {
		// GETS THE SEASON TOTAL FOUL COUNT OF ALL THE TEAMS COMBINED
		totalFouls = totalFouls + Number(mwest[i].foulsPG);
		// GETS THE SEASON TOTAL FREE THROW PERCENTAGES ADDED UP TO LATER GET AN AVERAGE
		totalFTPercentage = totalFTPercentage + Number(mwest[i].ftPercentage);
		document.getElementById(`c11s${mwNum}`).textContent = mwest[i].name;
		mwNum++;
	}
	//
	//
	//
	//
	//
	//
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

		const team1Pct = winPct(team1RecordArr);
		const team2Pct = winPct(team2RecordArr);

		if (team1Pct > team2Pct) {
			const pctDiff = team1Pct - team2Pct;
			switch (true) {
				case pctDiff >= 0.7:
					team1Score += Math.round((teamRecordWeight + teamRecordWeight * 0.75) * 100) / 100;
					break;
				case pctDiff >= 0.5:
					team1Score += Math.round((teamRecordWeight + teamRecordWeight * 0.5) * 100) / 100;
					break;
				case pctDiff >= 0.4:
					team1Score += Math.round((teamRecordWeight + teamRecordWeight * 0.25) * 100) / 100;
					break;
				case pctDiff >= 0.3:
					team1Score += teamRecordWeight;
					break;
				case pctDiff >= 0.2:
					team1Score += Math.round(teamRecordWeight * 0.75 * 100) / 100;
					break;
				case pctDiff >= 0.1:
					team1Score += Math.round(teamRecordWeight * 0.5 * 100) / 100;
					break;
				case pctDiff >= 0.05:
					team1Score += Math.round(teamRecordWeight * 0.25 * 100) / 100;
					break;
			}
		} else if (team2Pct > team1Pct) {
			const pctDiff = team2Pct - team1Pct;
			switch (true) {
				case pctDiff >= 0.7:
					team2Score += Math.round((teamRecordWeight + teamRecordWeight * 0.75) * 100) / 100;
					break;
				case pctDiff >= 0.5:
					team2Score += Math.round((teamRecordWeight + teamRecordWeight * 0.5) * 100) / 100;
					break;
				case pctDiff >= 0.4:
					team2Score += Math.round((teamRecordWeight + teamRecordWeight * 0.25) * 100) / 100;
					break;
				case pctDiff >= 0.3:
					team2Score += teamRecordWeight;
					break;
				case pctDiff >= 0.2:
					team2Score += Math.round(teamRecordWeight * 0.75 * 100) / 100;
					break;
				case pctDiff >= 0.1:
					team2Score += Math.round(teamRecordWeight * 0.5 * 100) / 100;
					break;
				case pctDiff >= 0.05:
					team2Score += Math.round(teamRecordWeight * 0.25 * 100) / 100;
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
					team1Score += Math.round((ftAttPGWeight + ftAttPGWeight * 0.8) * 100) / 100;
					break;
				case FAPGdiff >= 12:
					team1Score += Math.round((ftAttPGWeight + ftAttPGWeight * 0.6) * 100) / 100;
					break;
				case FAPGdiff >= 10:
					team1Score += Math.round((ftAttPGWeight + ftAttPGWeight * 0.4) * 100) / 100;
					break;
				case FAPGdiff >= 8:
					team1Score += Math.round((ftAttPGWeight + ftAttPGWeight * 0.2) * 100) / 100;
					break;
				case FAPGdiff >= 6:
					team1Score += ftAttPGWeight;
					break;
				case FAPGdiff >= 4:
					team1Score += Math.round(ftAttPGWeight * 0.8 * 100) / 100;
					break;
				case FAPGdiff >= 2:
					team1Score += Math.round(ftAttPGWeight * 0.6 * 100) / 100;
					break;
				case FAPGdiff >= 1:
					team1Score += Math.round(ftAttPGWeight * 0.4 * 100) / 100;
					break;
				case FAPGdiff >= 0.5:
					team1Score += Math.round(ftAttPGWeight * 0.2 * 100) / 100;
					break;
				case FAPGdiff >= 0.25:
					team1Score += Math.round(ftAttPGWeight * 0.1 * 100) / 100;
					break;
			}
		} else if (team2FAPG > team1FAPG) {
			const FAPGdiff = team2FAPG - team1FAPG;
			switch (true) {
				case FAPGdiff >= 14:
					team2Score += Math.round((ftAttPGWeight + ftAttPGWeight * 0.8) * 100) / 100;
					break;
				case FAPGdiff >= 12:
					team2Score += Math.round((ftAttPGWeight + ftAttPGWeight * 0.6) * 100) / 100;
					break;
				case FAPGdiff >= 10:
					team2Score += Math.round((ftAttPGWeight + ftAttPGWeight * 0.4) * 100) / 100;
					break;
				case FAPGdiff >= 8:
					team2Score += Math.round((ftAttPGWeight + ftAttPGWeight * 0.2) * 100) / 100;
					break;
				case FAPGdiff >= 6:
					team2Score += ftAttPGWeight;
					break;
				case FAPGdiff >= 4:
					team2Score += Math.round(ftAttPGWeight * 0.8 * 100) / 100;
					break;
				case FAPGdiff >= 2:
					team2Score += Math.round(ftAttPGWeight * 0.6 * 100) / 100;
					break;
				case FAPGdiff >= 1:
					team2Score += Math.round(ftAttPGWeight * 0.4 * 100) / 100;
					break;
				case FAPGdiff >= 0.5:
					team2Score += Math.round(ftAttPGWeight * 0.2 * 100) / 100;
					break;
				case FAPGdiff >= 0.25:
					team2Score += Math.round(ftAttPGWeight * 0.1 * 100) / 100;
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
					team1Score += Math.round((fgPercentageWeight + fgPercentageWeight * 0.8) * 100) / 100;
					break;
				case FGpctDiff >= 12:
					team1Score += Math.round((fgPercentageWeight + fgPercentageWeight * 0.6) * 100) / 100;
					break;
				case FGpctDiff >= 10:
					team1Score += Math.round((fgPercentageWeight + fgPercentageWeight * 0.4) * 100) / 100;
					break;
				case FGpctDiff >= 8:
					team1Score += Math.round((fgPercentageWeight + fgPercentageWeight * 0.2) * 100) / 100;
					break;
				case FGpctDiff >= 6:
					team1Score += fgPercentageWeight;
					break;
				case FGpctDiff >= 4:
					team1Score += Math.round(fgPercentageWeight * 0.8 * 100) / 100;
					break;
				case FGpctDiff >= 2:
					team1Score += Math.round(fgPercentageWeight * 0.6 * 100) / 100;
					break;
				case FGpctDiff >= 1:
					team1Score += Math.round(fgPercentageWeight * 0.4 * 100) / 100;
					break;
				case FGpctDiff >= 0.5:
					team1Score += Math.round(fgPercentageWeight * 0.2 * 100) / 100;
					break;
				case FGpctDiff >= 0.25:
					team1Score += Math.round(fgPercentageWeight * 0.1 * 100) / 100;
					break;
			}
		} else if (team2FGpct > team1FGpct) {
			const FGpctDiff = team2FGpct - team1FGpct;
			switch (true) {
				case FGpctDiff >= 15:
					team2Score += Math.round((fgPercentageWeight + fgPercentageWeight * 0.8) * 100) / 100;
					break;
				case FGpctDiff >= 12:
					team2Score += Math.round((fgPercentageWeight + fgPercentageWeight * 0.6) * 100) / 100;
					break;
				case FGpctDiff >= 10:
					team2Score += Math.round((fgPercentageWeight + fgPercentageWeight * 0.4) * 100) / 100;
					break;
				case FGpctDiff >= 8:
					team2Score += Math.round((fgPercentageWeight + fgPercentageWeight * 0.2) * 100) / 100;
					break;
				case FGpctDiff >= 6:
					team2Score += fgPercentageWeight;
					break;
				case FGpctDiff >= 4:
					team2Score += Math.round(fgPercentageWeight * 0.8 * 100) / 100;
					break;
				case FGpctDiff >= 2:
					team2Score += Math.round(fgPercentageWeight * 0.6 * 100) / 100;
					break;
				case FGpctDiff >= 1:
					team2Score += Math.round(fgPercentageWeight * 0.4 * 100) / 100;
					break;
				case FGpctDiff >= 0.5:
					team2Score += Math.round(fgPercentageWeight * 0.2 * 100) / 100;
					break;
				case FGpctDiff >= 0.25:
					team2Score += Math.round(fgPercentageWeight * 0.1 * 100) / 100;
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
					team2Score += Math.round((toPGWeight + toPGWeight * 0.8) * 100) / 100;
					break;
				case TODiff >= 7:
					team2Score += Math.round((toPGWeight + toPGWeight * 0.6) * 100) / 100;
					break;
				case TODiff >= 6:
					team2Score += Math.round((toPGWeight + toPGWeight * 0.4) * 100) / 100;
					break;
				case TODiff >= 5:
					team2Score += Math.round((toPGWeight + toPGWeight * 0.2) * 100) / 100;
					break;
				case TODiff >= 4:
					team2Score += toPGWeight;
					break;
				case TODiff >= 3:
					team2Score += Math.round(toPGWeight * 0.8 * 100) / 100;
					break;
				case TODiff >= 2:
					team2Score += Math.round(toPGWeight * 0.6 * 100) / 100;
					break;
				case TODiff >= 1:
					team2Score += Math.round(toPGWeight * 0.4 * 100) / 100;
					break;
				case TODiff >= 0.5:
					team2Score += Math.round(toPGWeight * 0.2 * 100) / 100;
					break;
				case TODiff >= 0.25:
					team2Score += Math.round(toPGWeight * 0.1 * 100) / 100;
					break;
			}
		} else if (team2toPG > team1toPG) {
			const TODiff = team2toPG - team1toPG;
			switch (true) {
				case TODiff >= 8:
					team1Score += Math.round((toPGWeight + toPGWeight * 0.8) * 100) / 100;
					break;
				case TODiff >= 7:
					team1Score += Math.round((toPGWeight + toPGWeight * 0.6) * 100) / 100;
					break;
				case TODiff >= 6:
					team1Score += Math.round((toPGWeight + toPGWeight * 0.4) * 100) / 100;
					break;
				case TODiff >= 5:
					team1Score += Math.round((toPGWeight + toPGWeight * 0.2) * 100) / 100;
					break;
				case TODiff >= 4:
					team1Score += toPGWeight;
					break;
				case TODiff >= 3:
					team1Score += Math.round(toPGWeight * 0.8 * 100) / 100;
					break;
				case TODiff >= 2:
					team1Score += Math.round(toPGWeight * 0.6 * 100) / 100;
					break;
				case TODiff >= 1:
					team1Score += Math.round(toPGWeight * 0.4 * 100) / 100;
					break;
				case TODiff >= 0.5:
					team1Score += Math.round(toPGWeight * 0.2 * 100) / 100;
					break;
				case TODiff >= 0.25:
					team1Score += Math.round(toPGWeight * 0.1 * 100) / 100;
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
					team1Score += Math.round((oRebPGWeight + oRebPGWeight * 0.8) * 100) / 100;
					break;
				case oRebPGDiff >= 9:
					team1Score += Math.round((oRebPGWeight + oRebPGWeight * 0.6) * 100) / 100;
					break;
				case oRebPGDiff >= 7:
					team1Score += Math.round((oRebPGWeight + oRebPGWeight * 0.4) * 100) / 100;
					break;
				case oRebPGDiff >= 6:
					team1Score += Math.round((oRebPGWeight + oRebPGWeight * 0.2) * 100) / 100;
					break;
				case oRebPGDiff >= 5:
					team1Score += oRebPGWeight;
					break;
				case oRebPGDiff >= 4:
					team1Score += Math.round(oRebPGWeight * 0.8 * 100) / 100;
					break;
				case oRebPGDiff >= 3:
					team1Score += Math.round(oRebPGWeight * 0.6 * 100) / 100;
					break;
				case oRebPGDiff >= 2:
					team1Score += Math.round(oRebPGWeight * 0.4 * 100) / 100;
					break;
				case oRebPGDiff >= 1:
					team1Score += Math.round(oRebPGWeight * 0.2 * 100) / 100;
					break;
				case oRebPGDiff >= 0.5:
					team1Score += Math.round(oRebPGWeight * 0.1 * 100) / 100;
					break;
			}
		} else if (team2oRebPG > team1oRebPG) {
			const oRebPGDiff = team2oRebPG - team1oRebPG;
			switch (true) {
				case oRebPGDiff >= 11:
					team2Score += Math.round((oRebPGWeight + oRebPGWeight * 0.8) * 100) / 100;
					break;
				case oRebPGDiff >= 9:
					team2Score += Math.round((oRebPGWeight + oRebPGWeight * 0.6) * 100) / 100;
					break;
				case oRebPGDiff >= 7:
					team2Score += Math.round((oRebPGWeight + oRebPGWeight * 0.4) * 100) / 100;
					break;
				case oRebPGDiff >= 6:
					team2Score += Math.round((oRebPGWeight + oRebPGWeight * 0.2) * 100) / 100;
					break;
				case oRebPGDiff >= 5:
					team2Score += oRebPGWeight;
					break;
				case oRebPGDiff >= 4:
					team2Score += Math.round(oRebPGWeight * 0.8 * 100) / 100;
					break;
				case oRebPGDiff >= 3:
					team2Score += Math.round(oRebPGWeight * 0.6 * 100) / 100;
					break;
				case oRebPGDiff >= 2:
					team2Score += Math.round(oRebPGWeight * 0.4 * 100) / 100;
					break;
				case oRebPGDiff >= 1:
					team2Score += Math.round(oRebPGWeight * 0.2 * 100) / 100;
					break;
				case oRebPGDiff >= 0.5:
					team2Score += Math.round(oRebPGWeight * 0.1 * 100) / 100;
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
					team1Score += Math.round((dRebPGWeight + dRebPGWeight * 0.8) * 100) / 100;
					break;
				case dRebPGDiff >= 9:
					team1Score += Math.round((dRebPGWeight + dRebPGWeight * 0.6) * 100) / 100;
					break;
				case dRebPGDiff >= 7:
					team1Score += Math.round((dRebPGWeight + dRebPGWeight * 0.4) * 100) / 100;
					break;
				case dRebPGDiff >= 6:
					team1Score += Math.round((dRebPGWeight + dRebPGWeight * 0.2) * 100) / 100;
					break;
				case dRebPGDiff >= 5:
					team1Score += dRebPGWeight;
					break;
				case dRebPGDiff >= 4:
					team1Score += Math.round(dRebPGWeight * 0.8 * 100) / 100;
					break;
				case dRebPGDiff >= 3:
					team1Score += Math.round(dRebPGWeight * 0.6 * 100) / 100;
					break;
				case dRebPGDiff >= 2:
					team1Score += Math.round(dRebPGWeight * 0.4 * 100) / 100;
					break;
				case dRebPGDiff >= 1:
					team1Score += Math.round(dRebPGWeight * 0.2 * 100) / 100;
					break;
				case dRebPGDiff >= 0.5:
					team1Score += Math.round(dRebPGWeight * 0.1 * 100) / 100;
					break;
			}
		} else if (team2dRebPG > team1dRebPG) {
			const dRebPGDiff = team2dRebPG - team1dRebPG;
			switch (true) {
				case dRebPGDiff >= 11:
					team2Score += Math.round((dRebPGWeight + dRebPGWeight * 0.8) * 100) / 100;
					break;
				case dRebPGDiff >= 9:
					team2Score += Math.round((dRebPGWeight + dRebPGWeight * 0.6) * 100) / 100;
					break;
				case dRebPGDiff >= 7:
					team2Score += Math.round((dRebPGWeight + dRebPGWeight * 0.4) * 100) / 100;
					break;
				case dRebPGDiff >= 6:
					team2Score += Math.round((dRebPGWeight + dRebPGWeight * 0.2) * 100) / 100;
					break;
				case dRebPGDiff >= 5:
					team2Score += dRebPGWeight;
					break;
				case dRebPGDiff >= 4:
					team2Score += Math.round(dRebPGWeight * 0.8 * 100) / 100;
					break;
				case dRebPGDiff >= 3:
					team2Score += Math.round(dRebPGWeight * 0.6 * 100) / 100;
					break;
				case dRebPGDiff >= 2:
					team2Score += Math.round(dRebPGWeight * 0.4 * 100) / 100;
					break;
				case dRebPGDiff >= 1:
					team2Score += Math.round(dRebPGWeight * 0.2 * 100) / 100;
					break;
				case dRebPGDiff >= 0.5:
					team2Score += Math.round(dRebPGWeight * 0.1 * 100) / 100;
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
					team1Score += Math.round((ThreePTPGWeight + ThreePTPGWeight * 0.8) * 100) / 100;
					break;
				case ThreePTDiff >= 8:
					team1Score += Math.round((ThreePTPGWeight + ThreePTPGWeight * 0.6) * 100) / 100;
					break;
				case ThreePTDiff >= 7:
					team1Score += Math.round((ThreePTPGWeight + ThreePTPGWeight * 0.4) * 100) / 100;
					break;
				case ThreePTDiff >= 6:
					team1Score += Math.round((ThreePTPGWeight + ThreePTPGWeight * 0.2) * 100) / 100;
					break;
				case ThreePTDiff >= 5:
					team1Score += ThreePTPGWeight;
					break;
				case ThreePTDiff >= 4:
					team1Score += Math.round(ThreePTPGWeight * 0.8 * 100) / 100;
					break;
				case ThreePTDiff >= 3:
					team1Score += Math.round(ThreePTPGWeight * 0.6 * 100) / 100;
					break;
				case ThreePTDiff >= 2:
					team1Score += Math.round(ThreePTPGWeight * 0.4 * 100) / 100;
					break;
				case ThreePTDiff >= 1:
					team1Score += Math.round(ThreePTPGWeight * 0.2 * 100) / 100;
					break;
				case ThreePTDiff >= 0.5:
					team1Score += Math.round(ThreePTPGWeight * 0.1 * 100) / 100;
					break;
			}
		} else if (team23PTPG > team13PTPG) {
			const ThreePTDiff = team23PTPG - team13PTPG;
			switch (true) {
				case ThreePTDiff >= 9:
					team2Score += Math.round((ThreePTPGWeight + ThreePTPGWeight * 0.8) * 100) / 100;
					break;
				case ThreePTDiff >= 8:
					team2Score += Math.round((ThreePTPGWeight + ThreePTPGWeight * 0.6) * 100) / 100;
					break;
				case ThreePTDiff >= 7:
					team2Score += Math.round((ThreePTPGWeight + ThreePTPGWeight * 0.4) * 100) / 100;
					break;
				case ThreePTDiff >= 6:
					team2Score += Math.round((ThreePTPGWeight + ThreePTPGWeight * 0.2) * 100) / 100;
					break;
				case ThreePTDiff >= 5:
					team2Score += ThreePTPGWeight;
					break;
				case ThreePTDiff >= 4:
					team2Score += Math.round(ThreePTPGWeight * 0.8 * 100) / 100;
					break;
				case ThreePTDiff >= 3:
					team2Score += Math.round(ThreePTPGWeight * 0.6 * 100) / 100;
					break;
				case ThreePTDiff >= 2:
					team2Score += Math.round(ThreePTPGWeight * 0.4 * 100) / 100;
					break;
				case ThreePTDiff >= 1:
					team2Score += Math.round(ThreePTPGWeight * 0.2 * 100) / 100;
					break;
				case ThreePTDiff >= 0.5:
					team2Score += Math.round(ThreePTPGWeight * 0.1 * 100) / 100;
					break;
			}
		}

		const team1SOS = Number(game.SOS[0]);
		const team2SOS = Number(game.SOS[1]);
		if (team1SOS > team2SOS) {
			const SOSDiff = team1SOS - team2SOS;
			switch (true) {
				case SOSDiff >= 18:
					team1Score += Math.round((SOSWeight + SOSWeight * 1.2) * 100) / 100;
					break;
				case SOSDiff >= 16:
					team1Score += Math.round((SOSWeight + SOSWeight * 1) * 100) / 100;
					break;
				case SOSDiff >= 14:
					team1Score += Math.round((SOSWeight + SOSWeight * 0.8) * 100) / 100;
					break;
				case SOSDiff >= 12:
					team1Score += Math.round((SOSWeight + SOSWeight * 0.6) * 100) / 100;
					break;
				case SOSDiff >= 10:
					team1Score += Math.round((SOSWeight + SOSWeight * 0.4) * 100) / 100;
					break;
				case SOSDiff >= 8:
					team1Score += Math.round((SOSWeight + SOSWeight * 0.2) * 100) / 100;
					break;
				case SOSDiff >= 6:
					team1Score += SOSWeight;
					break;
				case SOSDiff >= 5:
					team1Score += Math.round(SOSWeight * 0.9 * 100) / 100;
					break;
				case SOSDiff >= 4:
					team1Score += Math.round(SOSWeight * 0.8 * 100) / 100;
					break;
				case SOSDiff >= 3:
					team1Score += Math.round(SOSWeight * 0.7 * 100) / 100;
					break;
				case SOSDiff >= 2:
					team1Score += Math.round(SOSWeight * 0.5 * 100) / 100;
					break;
				case SOSDiff >= 1:
					team1Score += Math.round(SOSWeight * 0.4 * 100) / 100;
					break;
				case SOSDiff >= 0.5:
					team1Score += Math.round(SOSWeight * 0.2 * 100) / 100;
					break;
			}
		} else if (team2SOS > team1SOS) {
			const SOSDiff = team2SOS - team1SOS;
			switch (true) {
				case SOSDiff >= 18:
					team2Score += Math.round((SOSWeight + SOSWeight * 1.2) * 100) / 100;
					break;
				case SOSDiff >= 16:
					team2Score += Math.round((SOSWeight + SOSWeight * 1) * 100) / 100;
					break;
				case SOSDiff >= 14:
					team2Score += Math.round((SOSWeight + SOSWeight * 0.8) * 100) / 100;
					break;
				case SOSDiff >= 12:
					team2Score += Math.round((SOSWeight + SOSWeight * 0.6) * 100) / 100;
					break;
				case SOSDiff >= 10:
					team2Score += Math.round((SOSWeight + SOSWeight * 0.4) * 100) / 100;
					break;
				case SOSDiff >= 8:
					team2Score += Math.round((SOSWeight + SOSWeight * 0.2) * 100) / 100;
					break;
				case SOSDiff >= 6:
					team2Score += SOSWeight;
					break;
				case SOSDiff >= 5:
					team2Score += Math.round(SOSWeight * 0.9 * 100) / 100;
					break;
				case SOSDiff >= 4:
					team2Score += Math.round(SOSWeight * 0.8 * 100) / 100;
					break;
				case SOSDiff >= 3:
					team2Score += Math.round(SOSWeight * 0.7 * 100) / 100;
					break;
				case SOSDiff >= 2:
					team2Score += Math.round(SOSWeight * 0.5 * 100) / 100;
					break;
				case SOSDiff >= 1:
					team2Score += Math.round(SOSWeight * 0.4 * 100) / 100;
					break;
				case SOSDiff >= 0.5:
					team2Score += Math.round(SOSWeight * 0.2 * 100) / 100;
					break;
			}
		}

		const team1stealsPG = Number(game.stealsPG[0]);
		const team2stealsPG = Number(game.stealsPG[1]);
		if (team1stealsPG > team2stealsPG) {
			const stealsDiff = team1stealsPG - team2stealsPG;
			switch (true) {
				case stealsDiff >= 7:
					team1Score += Math.round((stealsPGWeight + stealsPGWeight * 0.7) * 100) / 100;
					break;
				case stealsDiff >= 6:
					team1Score += Math.round((stealsPGWeight + stealsPGWeight * 0.5) * 100) / 100;
					break;
				case stealsDiff >= 5.5:
					team1Score += Math.round((stealsPGWeight + stealsPGWeight * 0.4) * 100) / 100;
					break;
				case stealsDiff >= 5:
					team1Score += Math.round((stealsPGWeight + stealsPGWeight * 0.3) * 100) / 100;
					break;
				case stealsDiff >= 4.5:
					team1Score += Math.round((stealsPGWeight + stealsPGWeight * 0.2) * 100) / 100;
					break;
				case stealsDiff >= 4:
					team1Score += Math.round((stealsPGWeight + stealsPGWeight * 0.1) * 100) / 100;
					break;
				case stealsDiff >= 3.5:
					team1Score += stealsPGWeight;
					break;
				case stealsDiff >= 3:
					team1Score += Math.round(stealsPGWeight * 0.9 * 100) / 100;
					break;
				case stealsDiff >= 2:
					team1Score += Math.round(stealsPGWeight * 0.7 * 100) / 100;
					break;
				case stealsDiff >= 1.5:
					team1Score += Math.round(stealsPGWeight * 0.6 * 100) / 100;
					break;
				case stealsDiff >= 1:
					team1Score += Math.round(stealsPGWeight * 0.5 * 100) / 100;
					break;
				case stealsDiff >= 0.5:
					team1Score += Math.round(stealsPGWeight * 0.4 * 100) / 100;
					break;
				case stealsDiff >= 0.25:
					team1Score += Math.round(stealsPGWeight * 0.3 * 100) / 100;
					break;
			}
		} else if (team2stealsPG > team1stealsPG) {
			const stealsDiff = team2stealsPG - team1stealsPG;
			switch (true) {
				case stealsDiff >= 7:
					team2Score += Math.round((stealsPGWeight + stealsPGWeight * 0.7) * 100) / 100;
					break;
				case stealsDiff >= 6:
					team2Score += Math.round((stealsPGWeight + stealsPGWeight * 0.5) * 100) / 100;
					break;
				case stealsDiff >= 5.5:
					team2Score += Math.round((stealsPGWeight + stealsPGWeight * 0.4) * 100) / 100;
					break;
				case stealsDiff >= 5:
					team2Score += Math.round((stealsPGWeight + stealsPGWeight * 0.3) * 100) / 100;
					break;
				case stealsDiff >= 4.5:
					team2Score += Math.round((stealsPGWeight + stealsPGWeight * 0.2) * 100) / 100;
					break;
				case stealsDiff >= 4:
					team2Score += Math.round((stealsPGWeight + stealsPGWeight * 0.1) * 100) / 100;
					break;
				case stealsDiff >= 3.5:
					team2Score += stealsPGWeight;
					break;
				case stealsDiff >= 3:
					team2Score += Math.round(stealsPGWeight * 0.9 * 100) / 100;
					break;
				case stealsDiff >= 2:
					team2Score += Math.round(stealsPGWeight * 0.7 * 100) / 100;
					break;
				case stealsDiff >= 1.5:
					team2Score += Math.round(stealsPGWeight * 0.6 * 100) / 100;
					break;
				case stealsDiff >= 1:
					team2Score += Math.round(stealsPGWeight * 0.5 * 100) / 100;
					break;
				case stealsDiff >= 0.5:
					team2Score += Math.round(stealsPGWeight * 0.4 * 100) / 100;
					break;
				case stealsDiff >= 0.25:
					team2Score += Math.round(stealsPGWeight * 0.3 * 100) / 100;
					break;
			}
		}

		const team1blocksPG = Number(game.blocksPG[0]);
		const team2blocksPG = Number(game.blocksPG[1]);
		if (team1blocksPG > team2blocksPG) {
			const blocksDiff = team1blocksPG - team2blocksPG;
			switch (true) {
				case blocksDiff >= 5:
					team1Score += Math.round((blocksPGWeight + blocksPGWeight * 0.7) * 100) / 100;
					break;
				case blocksDiff >= 4.5:
					team1Score += Math.round((blocksPGWeight + blocksPGWeight * 0.6) * 100) / 100;
					break;
				case blocksDiff >= 4:
					team1Score += Math.round((blocksPGWeight + blocksPGWeight * 0.5) * 100) / 100;
					break;
				case blocksDiff >= 3.5:
					team1Score += Math.round((blocksPGWeight + blocksPGWeight * 0.4) * 100) / 100;
					break;
				case blocksDiff >= 3:
					team1Score += Math.round((blocksPGWeight + blocksPGWeight * 0.3) * 100) / 100;
					break;
				case blocksDiff >= 2.5:
					team1Score += Math.round((blocksPGWeight + blocksPGWeight * 0.2) * 100) / 100;
					break;
				case blocksDiff >= 2:
					team1Score += blocksPGWeight;
					break;
				case blocksDiff >= 1.75:
					team1Score += Math.round(blocksPGWeight * 0.9 * 100) / 100;
					break;
				case blocksDiff >= 1.5:
					team1Score += Math.round(blocksPGWeight * 0.7 * 100) / 100;
					break;
				case blocksDiff >= 1.25:
					team1Score += Math.round(blocksPGWeight * 0.6 * 100) / 100;
					break;
				case blocksDiff >= 1:
					team1Score += Math.round(blocksPGWeight * 0.5 * 100) / 100;
					break;
				case blocksDiff >= 0.5:
					team1Score += Math.round(blocksPGWeight * 0.3 * 100) / 100;
					break;
				case blocksDiff >= 0.25:
					team1Score += Math.round(blocksPGWeight * 0.2 * 100) / 100;
					break;
			}
		} else if (team2blocksPG > team1blocksPG) {
			const blocksDiff = team2blocksPG - team1blocksPG;
			switch (true) {
				case blocksDiff >= 5:
					team2Score += Math.round((blocksPGWeight + blocksPGWeight * 0.7) * 100) / 100;
					break;
				case blocksDiff >= 4.5:
					team2Score += Math.round((blocksPGWeight + blocksPGWeight * 0.6) * 100) / 100;
					break;
				case blocksDiff >= 4:
					team2Score += Math.round((blocksPGWeight + blocksPGWeight * 0.5) * 100) / 100;
					break;
				case blocksDiff >= 3.5:
					team2Score += Math.round((blocksPGWeight + blocksPGWeight * 0.4) * 100) / 100;
					break;
				case blocksDiff >= 3:
					team2Score += Math.round((blocksPGWeight + blocksPGWeight * 0.3) * 100) / 100;
					break;
				case blocksDiff >= 2.5:
					team2Score += Math.round((blocksPGWeight + blocksPGWeight * 0.2) * 100) / 100;
					break;
				case blocksDiff >= 2:
					team2Score += blocksPGWeight;
					break;
				case blocksDiff >= 1.75:
					team2Score += Math.round(blocksPGWeight * 0.9 * 100) / 100;
					break;
				case blocksDiff >= 1.5:
					team2Score += Math.round(blocksPGWeight * 0.7 * 100) / 100;
					break;
				case blocksDiff >= 1.25:
					team2Score += Math.round(blocksPGWeight * 0.6 * 100) / 100;
					break;
				case blocksDiff >= 1:
					team2Score += Math.round(blocksPGWeight * 0.5 * 100) / 100;
					break;
				case blocksDiff >= 0.5:
					team2Score += Math.round(blocksPGWeight * 0.3 * 100) / 100;
					break;
				case blocksDiff >= 0.25:
					team2Score += Math.round(blocksPGWeight * 0.2 * 100) / 100;
					break;
			}
		}

		const team1FTPercentage = Number(game.ftPercentage[0]);
		const team2FTPercentage = Number(game.ftPercentage[1]);
		if (team1FTPercentage > team2FTPercentage) {
			const ftPercentageDiff = team1FTPercentage - team2FTPercentage;
			switch (true) {
				case ftPercentageDiff >= 19:
					team1Score += Math.round((ftPercentageWeight + ftPercentageWeight * 1.2) * 100) / 100;
					break;
				case ftPercentageDiff >= 16:
					team1Score += Math.round((ftPercentageWeight + ftPercentageWeight * 1) * 100) / 100;
					break;
				case ftPercentageDiff >= 13:
					team1Score += Math.round((ftPercentageWeight + ftPercentageWeight * 0.8) * 100) / 100;
					break;
				case ftPercentageDiff >= 10:
					team1Score += Math.round((ftPercentageWeight + ftPercentageWeight * 0.6) * 100) / 100;
					break;
				case ftPercentageDiff >= 7:
					team1Score += Math.round((ftPercentageWeight + ftPercentageWeight * 0.4) * 100) / 100;
					break;
				case ftPercentageDiff >= 5:
					team1Score += Math.round((ftPercentageWeight + ftPercentageWeight * 0.2) * 100) / 100;
					break;
				case ftPercentageDiff >= 4:
					team1Score += ftPercentageWeight;
					break;
				case ftPercentageDiff >= 3:
					team1Score += Math.round(ftPercentageWeight * 0.8 * 100) / 100;
					break;
				case ftPercentageDiff >= 2.5:
					team1Score += Math.round(ftPercentageWeight * 0.7 * 100) / 100;
					break;
				case ftPercentageDiff >= 2:
					team1Score += Math.round(ftPercentageWeight * 0.6 * 100) / 100;
					break;
				case ftPercentageDiff >= 1.5:
					team1Score += Math.round(ftPercentageWeight * 0.5 * 100) / 100;
					break;
				case ftPercentageDiff >= 1:
					team1Score += Math.round(ftPercentageWeight * 0.4 * 100) / 100;
					break;
				case ftPercentageDiff >= 0.5:
					team1Score += Math.round(ftPercentageWeight * 0.3 * 100) / 100;
					break;
			}
		} else if (team2FTPercentage > team1FTPercentage) {
			const ftPercentageDiff = team2FTPercentage - team1FTPercentage;
			switch (true) {
				case ftPercentageDiff >= 19:
					team2Score += Math.round((ftPercentageWeight + ftPercentageWeight * 1.2) * 100) / 100;
					break;
				case ftPercentageDiff >= 16:
					team2Score += Math.round((ftPercentageWeight + ftPercentageWeight * 1) * 100) / 100;
					break;
				case ftPercentageDiff >= 13:
					team2Score += Math.round((ftPercentageWeight + ftPercentageWeight * 0.8) * 100) / 100;
					break;
				case ftPercentageDiff >= 10:
					team2Score += Math.round((ftPercentageWeight + ftPercentageWeight * 0.6) * 100) / 100;
					break;
				case ftPercentageDiff >= 7:
					team2Score += Math.round((ftPercentageWeight + ftPercentageWeight * 0.4) * 100) / 100;
					break;
				case ftPercentageDiff >= 5:
					team2Score += Math.round((ftPercentageWeight + ftPercentageWeight * 0.2) * 100) / 100;
					break;
				case ftPercentageDiff >= 4:
					team2Score += ftPercentageWeight;
					break;
				case ftPercentageDiff >= 3:
					team2Score += Math.round(ftPercentageWeight * 0.8 * 100) / 100;
					break;
				case ftPercentageDiff >= 2.5:
					team2Score += Math.round(ftPercentageWeight * 0.7 * 100) / 100;
					break;
				case ftPercentageDiff >= 2:
					team2Score += Math.round(ftPercentageWeight * 0.6 * 100) / 100;
					break;
				case ftPercentageDiff >= 1.5:
					team2Score += Math.round(ftPercentageWeight * 0.5 * 100) / 100;
					break;
				case ftPercentageDiff >= 1:
					team2Score += Math.round(ftPercentageWeight * 0.4 * 100) / 100;
					break;
				case ftPercentageDiff >= 0.5:
					team2Score += Math.round(ftPercentageWeight * 0.3 * 100) / 100;
					break;
			}
		}

		const team1injuries = Number(game.injuries[0]);
		const team2injuries = Number(game.injuries[1]);
		if (team1injuries > team2injuries) {
			const injuriesDiff = team1injuries - team2injuries;
			switch (true) {
				case injuriesDiff >= 8:
					team1Score += 1;
					break;
				case injuriesDiff >= 5:
					team1Score += 0.5;
					break;
				case injuriesDiff >= 3:
					team1Score += 0.2;
					break;
				case injuriesDiff >= 2:
					team2Score += 0.15;
					break;
				case injuriesDiff >= 1:
					team1Score += 0.1;
					break;
			}
		} else if (team2injuries > team1injuries) {
			const injuriesDiff = team2injuries - team1injuries;
			switch (true) {
				case injuriesDiff >= 8:
					team2Score += 1;
					break;
				case injuriesDiff >= 5:
					team2Score += 0.5;
					break;
				case injuriesDiff >= 3:
					team2Score += 0.2;
					break;
				case injuriesDiff >= 2:
					team2Score += 0.15;
					break;
				case injuriesDiff >= 1:
					team2Score += 0.1;
					break;
			}
		}

		const team1FoulsPG = Number(game.foulsPG[0]);
		const team2FoulsPG = Number(game.foulsPG[1]);
		if (team1FoulsPG > team2FoulsPG) {
			const foulsDiff = team1FoulsPG - team2FoulsPG;
			switch (true) {
				case foulsDiff >= 11:
					team2Score += Math.round((foulsPGWeight + foulsPGWeight * 1.2) * 100) / 100;
					break;
				case foulsDiff >= 9:
					team2Score += Math.round((foulsPGWeight + foulsPGWeight * 1) * 100) / 100;
					break;
				case foulsDiff >= 7:
					team2Score += Math.round((foulsPGWeight + foulsPGWeight * 0.8) * 100) / 100;
					break;
				case foulsDiff >= 5:
					team2Score += Math.round((foulsPGWeight + foulsPGWeight * 0.6) * 100) / 100;
					break;
				case foulsDiff >= 3:
					team2Score += Math.round((foulsPGWeight + foulsPGWeight * 0.4) * 100) / 100;
					break;
				case foulsDiff >= 2:
					team2Score += Math.round((foulsPGWeight + foulsPGWeight * 0.2) * 100) / 100;
					break;
				case foulsDiff >= 1:
					team2Score += foulsPGWeight;
					break;
				case foulsDiff >= 0.75:
					team2Score += Math.round(foulsPGWeight * 0.9 * 100) / 100;
					break;
				case foulsDiff >= 0.5:
					team2Score += Math.round(foulsPGWeight * 0.8 * 100) / 100;
					break;
				case foulsDiff >= 0.25:
					team2Score += Math.round(foulsPGWeight * 0.7 * 100) / 100;
					break;
				case foulsDiff >= 0.15:
					team2Score += Math.round(foulsPGWeight * 0.6 * 100) / 100;
					break;
				case foulsDiff >= 0.1:
					team2Score += Math.round(foulsPGWeight * 0.5 * 100) / 100;
					break;
				case foulsDiff >= 0.05:
					team2Score += Math.round(foulsPGWeight * 0.4 * 100) / 100;
					break;
			}
		} else if (team2FoulsPG > team1FoulsPG) {
			const foulsDiff = team2FoulsPG - team1FoulsPG;
			switch (true) {
				case foulsDiff >= 11:
					team1Score += Math.round((foulsPGWeight + foulsPGWeight * 1.2) * 100) / 100;
					break;
				case foulsDiff >= 9:
					team1Score += Math.round((foulsPGWeight + foulsPGWeight * 1) * 100) / 100;
					break;
				case foulsDiff >= 7:
					team1Score += Math.round((foulsPGWeight + foulsPGWeight * 0.8) * 100) / 100;
					break;
				case foulsDiff >= 5:
					team1Score += Math.round((foulsPGWeight + foulsPGWeight * 0.6) * 100) / 100;
					break;
				case foulsDiff >= 3:
					team1Score += Math.round((foulsPGWeight + foulsPGWeight * 0.4) * 100) / 100;
					break;
				case foulsDiff >= 2:
					team1Score += Math.round((foulsPGWeight + foulsPGWeight * 0.2) * 100) / 100;
					break;
				case foulsDiff >= 1:
					team1Score += foulsPGWeight;
					break;
				case foulsDiff >= 0.75:
					team1Score += Math.round(foulsPGWeight * 0.9 * 100) / 100;
					break;
				case foulsDiff >= 0.5:
					team1Score += Math.round(foulsPGWeight * 0.8 * 100) / 100;
					break;
				case foulsDiff >= 0.25:
					team1Score += Math.round(foulsPGWeight * 0.7 * 100) / 100;
					break;
				case foulsDiff >= 0.15:
					team1Score += Math.round(foulsPGWeight * 0.6 * 100) / 100;
					break;
				case foulsDiff >= 0.1:
					team1Score += Math.round(foulsPGWeight * 0.5 * 100) / 100;
					break;
				case foulsDiff >= 0.05:
					team1Score += Math.round(foulsPGWeight * 0.4 * 100) / 100;
					break;
			}
		}

		const team1assistsPG = Number(game.assistsPG[0]);
		const team2assistsPG = Number(game.assistsPG[1]);
		if (team1assistsPG > team2assistsPG) {
			const assistsDiff = team1assistsPG - team2assistsPG;
			switch (true) {
				case assistsDiff >= 11:
					team1Score += Math.round((assistsPGWeight + assistsPGWeight * 0.8) * 100) / 100;
					break;
				case assistsDiff >= 9:
					team1Score += Math.round((assistsPGWeight + assistsPGWeight * 0.6) * 100) / 100;
					break;
				case assistsDiff >= 7:
					team1Score += Math.round((assistsPGWeight + assistsPGWeight * 0.4) * 100) / 100;
					break;
				case assistsDiff >= 5:
					team1Score += Math.round((assistsPGWeight + assistsPGWeight * 0.2) * 100) / 100;
					break;
				case assistsDiff >= 4:
					team1Score += assistsPGWeight;
					break;
				case assistsDiff >= 3:
					team1Score += Math.round(assistsPGWeight * 0.8 * 100) / 100;
					break;
				case assistsDiff >= 2:
					team1Score += Math.round(assistsPGWeight * 0.6 * 100) / 100;
					break;
				case assistsDiff >= 1:
					team1Score += Math.round(assistsPGWeight * 0.4 * 100) / 100;
					break;
				case assistsDiff >= 0.5:
					team1Score += Math.round(assistsPGWeight * 0.3 * 100) / 100;
					break;
				case assistsDiff >= 0.25:
					team1Score += Math.round(assistsPGWeight * 0.2 * 100) / 100;
					break;
			}
		} else if (team2assistsPG > team1assistsPG) {
			const assistsDiff = team2assistsPG - team1assistsPG;
			switch (true) {
				case assistsDiff >= 11:
					team2Score += Math.round((assistsPGWeight + assistsPGWeight * 0.8) * 100) / 100;
					break;
				case assistsDiff >= 9:
					team2Score += Math.round((assistsPGWeight + assistsPGWeight * 0.6) * 100) / 100;
					break;
				case assistsDiff >= 7:
					team2Score += Math.round((assistsPGWeight + assistsPGWeight * 0.4) * 100) / 100;
					break;
				case assistsDiff >= 5:
					team2Score += Math.round((assistsPGWeight + assistsPGWeight * 0.2) * 100) / 100;
					break;
				case assistsDiff >= 4:
					team2Score += assistsPGWeight;
					break;
				case assistsDiff >= 3:
					team2Score += Math.round(assistsPGWeight * 0.8 * 100) / 100;
					break;
				case assistsDiff >= 2:
					team2Score += Math.round(assistsPGWeight * 0.6 * 100) / 100;
					break;
				case assistsDiff >= 1:
					team2Score += Math.round(assistsPGWeight * 0.4 * 100) / 100;
					break;
				case assistsDiff >= 0.5:
					team2Score += Math.round(assistsPGWeight * 0.3 * 100) / 100;
					break;
				case assistsDiff >= 0.25:
					team2Score += Math.round(assistsPGWeight * 0.2 * 100) / 100;
					break;
			}
		}

		const team1pointsPG = Number(game.pointsPG[0]);
		const team2pointsPG = Number(game.pointsPG[1]);
		if (team1pointsPG > team2pointsPG) {
			const pointsPGDiff = team1pointsPG - team2pointsPG;
			switch (true) {
				case pointsPGDiff >= 20:
					team1Score += Math.round((pointsPGWeight + pointsPGWeight * 0.8) * 100) / 100;
					break;
				case pointsPGDiff >= 18:
					team1Score += Math.round((pointsPGWeight + pointsPGWeight * 0.6) * 100) / 100;
					break;
				case pointsPGDiff >= 16:
					team1Score += Math.round((pointsPGWeight + pointsPGWeight * 0.4) * 100) / 100;
					break;
				case pointsPGDiff >= 14:
					team1Score += Math.round((pointsPGWeight + pointsPGWeight * 0.2) * 100) / 100;
					break;
				case pointsPGDiff >= 12:
					team1Score += pointsPGWeight;
					break;
				case pointsPGDiff >= 10:
					team1Score += Math.round(pointsPGWeight * 0.8 * 100) / 100;
					break;
				case pointsPGDiff >= 8:
					team1Score += Math.round(pointsPGWeight * 0.6 * 100) / 100;
					break;
				case pointsPGDiff >= 6:
					team1Score += Math.round(pointsPGWeight * 0.4 * 100) / 100;
					break;
				case pointsPGDiff >= 4:
					team1Score += Math.round(pointsPGWeight * 0.2 * 100) / 100;
					break;
				case pointsPGDiff >= 2:
					team1Score += Math.round(pointsPGWeight * 0.1 * 100) / 100;
					break;
			}
		} else if (team2pointsPG > team1pointsPG) {
			const pointsPGDiff = team2pointsPG - team1pointsPG;
			switch (true) {
				case pointsPGDiff >= 20:
					team2Score += Math.round((pointsPGWeight + pointsPGWeight * 0.8) * 100) / 100;
					break;
				case pointsPGDiff >= 18:
					team2Score += Math.round((pointsPGWeight + pointsPGWeight * 0.6) * 100) / 100;
					break;
				case pointsPGDiff >= 16:
					team2Score += Math.round((pointsPGWeight + pointsPGWeight * 0.4) * 100) / 100;
					break;
				case pointsPGDiff >= 14:
					team2Score += Math.round((pointsPGWeight + pointsPGWeight * 0.2) * 100) / 100;
					break;
				case pointsPGDiff >= 12:
					team2Score += pointsPGWeight;
					break;
				case pointsPGDiff >= 10:
					team2Score += Math.round(pointsPGWeight * 0.8 * 100) / 100;
					break;
				case pointsPGDiff >= 8:
					team2Score += Math.round(pointsPGWeight * 0.6 * 100) / 100;
					break;
				case pointsPGDiff >= 6:
					team2Score += Math.round(pointsPGWeight * 0.4 * 100) / 100;
					break;
				case pointsPGDiff >= 4:
					team2Score += Math.round(pointsPGWeight * 0.2 * 100) / 100;
					break;
				case pointsPGDiff >= 2:
					team2Score += Math.round(pointsPGWeight * 0.1 * 100) / 100;
					break;
			}
		}

		const team1OppPointsPG = Number(game.oppPointsPG[0]);
		const team2OppPointsPG = Number(game.oppPointsPG[1]);
		if (team1OppPointsPG > team2OppPointsPG) {
			const oppPointsPGDiff = team1OppPointsPG - team2OppPointsPG;
			switch (true) {
				case oppPointsPGDiff >= 20:
					team2Score += Math.round((opponentsPointsPGWeight + opponentsPointsPGWeight * 0.8) * 100) / 100;
					break;
				case oppPointsPGDiff >= 18:
					team2Score += Math.round((opponentsPointsPGWeight + opponentsPointsPGWeight * 0.6) * 100) / 100;
					break;
				case oppPointsPGDiff >= 16:
					team2Score += Math.round((opponentsPointsPGWeight + opponentsPointsPGWeight * 0.4) * 100) / 100;
					break;
				case oppPointsPGDiff >= 14:
					team2Score += Math.round((opponentsPointsPGWeight + opponentsPointsPGWeight * 0.2) * 100) / 100;
					break;
				case oppPointsPGDiff >= 12:
					team2Score += opponentsPointsPGWeight;
					break;
				case oppPointsPGDiff >= 10:
					team2Score += Math.round(opponentsPointsPGWeight * 0.8 * 100) / 100;
					break;
				case oppPointsPGDiff >= 8:
					team2Score += Math.round(opponentsPointsPGWeight * 0.6 * 100) / 100;
					break;
				case oppPointsPGDiff >= 6:
					team2Score += Math.round(opponentsPointsPGWeight * 0.4 * 100) / 100;
					break;
				case oppPointsPGDiff >= 4:
					team2Score += Math.round(opponentsPointsPGWeight * 0.2 * 100) / 100;
					break;
				case oppPointsPGDiff >= 2:
					team2Score += Math.round(opponentsPointsPGWeight * 0.1 * 100) / 100;
					break;
			}
		} else if (team2OppPointsPG > team1OppPointsPG) {
			const oppPointsPGDiff = team2OppPointsPG - team1OppPointsPG;
			switch (true) {
				case oppPointsPGDiff >= 20:
					team1Score += Math.round((opponentsPointsPGWeight + opponentsPointsPGWeight * 0.8) * 100) / 100;
					break;
				case oppPointsPGDiff >= 18:
					team1Score += Math.round((opponentsPointsPGWeight + opponentsPointsPGWeight * 0.6) * 100) / 100;
					break;
				case oppPointsPGDiff >= 16:
					team1Score += Math.round((opponentsPointsPGWeight + opponentsPointsPGWeight * 0.4) * 100) / 100;
					break;
				case oppPointsPGDiff >= 14:
					team1Score += Math.round((opponentsPointsPGWeight + opponentsPointsPGWeight * 0.2) * 100) / 100;
					break;
				case oppPointsPGDiff >= 12:
					team1Score += opponentsPointsPGWeight;
					break;
				case oppPointsPGDiff >= 10:
					team1Score += Math.round(opponentsPointsPGWeight * 0.8 * 100) / 100;
					break;
				case oppPointsPGDiff >= 8:
					team1Score += Math.round(opponentsPointsPGWeight * 0.6 * 100) / 100;
					break;
				case oppPointsPGDiff >= 6:
					team1Score += Math.round(opponentsPointsPGWeight * 0.4 * 100) / 100;
					break;
				case oppPointsPGDiff >= 4:
					team1Score += Math.round(opponentsPointsPGWeight * 0.2 * 100) / 100;
					break;
				case oppPointsPGDiff >= 2:
					team1Score += Math.round(opponentsPointsPGWeight * 0.1 * 100) / 100;
					break;
			}
		}

		if (optionalFTBuffChecked) {
			// CONDITIONAL FREE THROW BUFF
			const averageFoulsPG = totalFouls / 64;
			const averageFTPercentage = totalFTPercentage / 64;
			if (team2FoulsPG > averageFoulsPG && team1FTPercentage > averageFTPercentage) {
				let totalOverAverageFTPercentage = team1FTPercentage - averageFTPercentage;
				let totalOverAverageFoulsPG = team2FoulsPG - averageFoulsPG;
				const totalFTAdvantage = totalOverAverageFTPercentage + totalOverAverageFoulsPG;
				switch (true) {
					case totalFTAdvantage >= 12:
						team1Score += 0.8;
						break;
					case totalFTAdvantage >= 9:
						team1Score += 0.7;
						break;
					case totalFTAdvantage >= 7:
						team1Score += 0.6;
						break;
					case totalFTAdvantage >= 5:
						team1Score += 0.5;
						break;
					case totalFTAdvantage >= 4:
						team1Score += 0.4;
						break;
					case totalFTAdvantage >= 3:
						team1Score += 0.3;
						break;
					case totalFTAdvantage >= 2:
						team1Score += 0.2;
						break;
					case totalFTAdvantage >= 1:
						team1Score += 0.1;
						break;
					case totalFTAdvantage >= 0.5:
						team1Score += 0.075;
						break;
					case totalFTAdvantage >= 0.25:
						team1Score += 0.05;
						break;
				}
			}
			if (team1FoulsPG > averageFoulsPG && team2FTPercentage > averageFTPercentage) {
				let totalOverAverageFTPercentage = team2FTPercentage - averageFTPercentage;
				let totalOverAverageFoulsPG = team1FoulsPG - averageFoulsPG;
				const totalFTAdvantage = totalOverAverageFTPercentage + totalOverAverageFoulsPG;
				switch (true) {
					case totalFTAdvantage >= 12:
						team2Score += 0.8;
						break;
					case totalFTAdvantage >= 9:
						team2Score += 0.7;
						break;
					case totalFTAdvantage >= 7:
						team2Score += 0.6;
						break;
					case totalFTAdvantage >= 5:
						team2Score += 0.5;
						break;
					case totalFTAdvantage >= 4:
						team2Score += 0.4;
						break;
					case totalFTAdvantage >= 3:
						team2Score += 0.3;
						break;
					case totalFTAdvantage >= 2:
						team2Score += 0.2;
						break;
					case totalFTAdvantage >= 1:
						team2Score += 0.1;
						break;
					case totalFTAdvantage >= 0.5:
						team2Score += 0.075;
						break;
					case totalFTAdvantage >= 0.25:
						team2Score += 0.05;
						break;
				}
			}
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
