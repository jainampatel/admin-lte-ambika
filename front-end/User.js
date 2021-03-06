import React from "react";

const User = () => {
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header card-header-primary">
                <h4 className="card-title">Edit Profile</h4>
                <p className="card-category">Complete your profile</p>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="form-group">
                        <label className="bmd-label-floating">
                          Company (disabled)
                        </label>
                        <input type="text" className="form-control" disabled />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="bmd-label-floating">Username</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">
                          Email address
                        </label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Fist Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Last Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="bmd-label-floating">Adress</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">City</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">Country</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">
                          Postal Code
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>About Me</label>
                        <div className="form-group">
                          <label className="bmd-label-floating">
                            {" "}
                            Lamborghini Mercy, Your chick she so thirsty, I'm in
                            that two seat Lambo.
                          </label>
                          <textarea
                            className="form-control"
                            rows="5"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary pull-right">
                    Update Profile
                  </button>
                  <div className="clearfix"></div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-profile">
              <div className="card-avatar">
                <a href="javascript:;">
                  <img className="img" src="assets/img/faces/marc.jpg" />
                </a>
              </div>
              <div className="card-body">
                <h6 className="card-category text-gray">CEO / Co-Founder</h6>
                <h4 className="card-title">Alec Thompson</h4>
                <p className="card-description">
                  Don't be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens??? bed design but the back is...
                </p>
                <a href="javascript:;" className="btn btn-primary btn-round">
                  Follow
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
