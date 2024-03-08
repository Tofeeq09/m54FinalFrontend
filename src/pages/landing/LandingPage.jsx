import GroupForm from "../../components/groups/GroupForm";

const LandingPage = ({ user }) => {
  return (
    <div>
      LandingPage
      <GroupForm user={user} />
    </div>
  );
};

export default LandingPage;
