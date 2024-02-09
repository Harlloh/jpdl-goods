import VerifyClient from "./VerifyClient";

interface IParams {
  userId?: string;
}
function page({ params }: { params: IParams }) {
  return (
    <div>
      <VerifyClient params={params} />
    </div>
  );
}

export default page;
