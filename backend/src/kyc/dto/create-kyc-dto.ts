import { KYCDoc } from '../../entities/kyc-doc.entity';
import { KYCApprovalStatus } from '../../entities/kyc.entity';

export class CreateKycDto {
  panNo?: string;
  aadharNo?: string;
  approvedStatus?: KYCApprovalStatus;
  remarks?: string;
  documents: KYCDoc[];
}
