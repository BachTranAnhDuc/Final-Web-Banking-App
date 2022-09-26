import React from 'react';

const Setting = () => {
  return (
    <section className="section-setting">
      <h2 className="heading--secondary">Setting</h2>

      <nav className="setting-nav">
        <span className="setting-nav__link">My detail</span>
        <span className="setting-nav__link">My detail</span>
        <span className="setting-nav__link">My detail</span>
        <span className="setting-nav__link">My detail</span>
        <span className="setting-nav__link">My detail</span>
      </nav>

      <form className="setting-form">
        <div className="setting-heading__content">
          <div className="setting-heading__context">
            <h3 className="heading--tertiary">Personal info</h3>
            <p className="setting-heading__text">
              Update your photo and personal details here
            </p>
          </div>

          <div className="setting-heading__buttons">
            <button className="btn" type="button">
              Cancel
            </button>
            <button className="btn" type="button">
              Save
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-input" name="name" id="name" />
        </div>

        <div className="form-control">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-input" name="email" id="email" />
        </div>

        <div className="form-control">
          <label htmlFor="birth" className="form-label">
            Birth
          </label>
          <input type="date" className="form-input" name="birth" id="birth" />
        </div>
      </form>
    </section>
  );
};

export default Setting;
