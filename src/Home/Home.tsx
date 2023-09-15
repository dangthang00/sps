function Home() {

  const storedData = localStorage.getItem('registeredUsers');
  const userList = storedData ? JSON.parse(storedData) : [];

  return ( 
    <div className="card list-group d-flex justify-content-center align-items-center vh-100">
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Họ và tên</th>
              <th scope="col">Email</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Địa chỉ</th>
            </tr>
          </thead>
          <tbody>
          {userList.map((user: any, index: number) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;

