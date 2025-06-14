import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Certificate {
  'owner' : Principal,
  'hash' : string,
  'timestamp' : bigint,
}
export interface _SERVICE {
  'getCertificates' : ActorMethod<[], Array<[string, Certificate]>>,
  'storeCertificate' : ActorMethod<[string], undefined>,
  'verifyCertificate' : ActorMethod<[string], [] | [Certificate]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
