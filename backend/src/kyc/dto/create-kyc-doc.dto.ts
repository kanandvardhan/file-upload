import { DocumentType } from '../../entities/kyc-doc.entity';

export class CreateKycDocDto {
  docType: DocumentType;
  docPath: string;
}
