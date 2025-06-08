export const idlFactory = ({ IDL }) => {
  const Certificate = IDL.Record({
    'owner' : IDL.Principal,
    'hash' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  return IDL.Service({
    'getCertificates' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, Certificate))],
        ['query'],
      ),
    'storeCertificate' : IDL.Func([IDL.Text], [], []),
    'verifyCertificate' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(Certificate)],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
