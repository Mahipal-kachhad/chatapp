const Dashboard = () => {
  const user = sessionStorage.getItem("user");
  console.log(user);
  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
};

export default Dashboard;
