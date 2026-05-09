import { api } from "../../lib/axios";

export const getAuditTrailApi = async () => {
	const response = await api.get("/master-data/note/audit-trail");

	return response.data;
};
