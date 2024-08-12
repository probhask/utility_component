import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

const utilityTab = [
  { name: "Toast Notification", href: "/toast" },
  { name: "Nested File", href: "/nested-file" },
  // { name: "Modal Notification", href: "/modal" },
];

const Home = () => {
  return (
    <main className={styles["home-wrapper"]}>
      <h1 className={styles["home-heading"]}> Utility Components</h1>

      <h3 className={styles["home-sub-heading"]}>
        Click to proceed with a component
      </h3>

      <article className="container">
        <div className={styles["navigation-tab-outer"]}>
          <div className={styles["navigation-tab-inner"]}>
            {utilityTab.map((utilityTabItem, index) => {
              return (
                <Link to={utilityTabItem.href} key={index + "utility"}>
                  {utilityTabItem.name}
                </Link>
              );
            })}
          </div>
        </div>
      </article>
    </main>
  );
};

export default Home;
