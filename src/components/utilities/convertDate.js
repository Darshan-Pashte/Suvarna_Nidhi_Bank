import moment from "moment";

export const convertDate = (date, type = 1) => {
	var formattedDate = "";
	switch (type) {
		case 1:
			formattedDate = moment(date).format("DD-MM-YYYY");
			break;
		case 2:
			formattedDate = moment(date).format("DD/MM/YYYY HH:mm:ss");
			break;
		case 3:
			formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
			break;
		case 4:
			formattedDate = moment(date).format("YYYY-MM-DD");
			break;
		case 5:
			formattedDate = moment(date).format("MM-DD-YYYY");
			break;
		case 6:
			formattedDate = moment(date).format("DD/MM/YYYY");
			break;
		case 7:
			formattedDate = moment(date).format("dd/MM/YYYY");
			break;
		case 8:
			formattedDate = moment(date).format("MM-DD-YYYY HH:mm:ss");
			break;
		case 9:
			formattedDate = moment(date).format("YYYYMMDD");
			break;
		case 10:
		formattedDate = moment(date).format("YYMM");
			break;

		case "string":
			// console.log(moment(date).valueOf())
			return moment(date).valueOf();
			break;
		default:
			break;
	}
	return formattedDate.toLowerCase() !== "invalid date" ? formattedDate : "";
};

export const DatePayloadDate = (date) => {
	// console.log("date", date);
	// console.log("date", moment(date).format("YYYY-MM-DD"))
	return moment(date).format("YYYY-MM-DD");
};
