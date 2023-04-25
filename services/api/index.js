import RCommon from '@/services/api/resource/RCommon';
import RComplaint from '@/services/api/resource/RComplaint';
import RLanguage from '@/services/api/resource/RLanguage';
import RManager from '@/services/api/resource/RManager';
import RMatrix from '@/services/api/resource/RMatrix';
import RProject from '@/services/api/resource/RProject';
import RProjectFile from '@/services/api/resource/RProjectFile';
import RProjectGlossary from '@/services/api/resource/RProjectGlossary';
import RProjectLink from '@/services/api/resource/RProjectLink';
import RProjectMedia from '@/services/api/resource/RProjectMedia';
import RProjectText from '@/services/api/resource/RProjectText';
import RProjectUser from '@/services/api/resource/RProjectUser';
import RProjectDiscussion from "@/services/api/resource/RProjectDiscussion";
import RRole from '@/services/api/resource/RRole';
import RSubject from '@/services/api/resource/RSubject';
import RUser from '@/services/api/resource/RUser';
import RImport from '@/services/api/resource/RImport';
import RFeedback from '@/services/api/resource/RFeedback';

export default (ctx) => ({
	common: new RCommon(ctx),
	complaint: new RComplaint(ctx),
	language: new RLanguage(ctx),
	manager: new RManager(ctx),
	matrix: new RMatrix(ctx),
	project: new RProject(ctx),
	projectFile: new RProjectFile(ctx),
	projectGlossary: new RProjectGlossary(ctx),
	projectLink: new RProjectLink(ctx),
	projectMedia: new RProjectMedia(ctx),
	projectText: new RProjectText(ctx),
	projectUser: new RProjectUser(ctx),
	projectDiscussion: new RProjectDiscussion(ctx),
	role: new RRole(ctx),
	subject: new RSubject(ctx),
	user: new RUser(ctx),
	import: new RImport(ctx),
	feedback: new RFeedback(ctx),
});
