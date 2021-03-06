import React, { CSSProperties } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { NewsArticle, KeywordsIE } from "../pages/Main";
import { useLocation, useHistory } from "react-router-dom";

import Chip from "@material-ui/core/Chip";

function Card(props: NewsArticle & KeywordsIE): JSX.Element {
  const location = useLocation();
  const history = useHistory();
  const sections = {};
  sections["POLITICS"] = "정치";
  sections["ECONOMY"] = "경제";
  sections["SOCIAL"] = "사회";
  sections["SCIENCE"] = "IT/과학";
  sections["LIFE"] = "생활/문화";
  sections["WORLD"] = "세계";
  const { title, url, img, createdAt, keywords, category } = props;
  const { includeKeywords, excludeKeywords } = props;
  const dateFormat = new Date(createdAt);
  const year = dateFormat.getFullYear();
  const month = dateFormat.getMonth() + 1;
  const date = dateFormat.getDate();
  const time =
    dateFormat.getHours() +
    ":" +
    (dateFormat.getMinutes() < 10 ? "0" : "") +
    dateFormat.getMinutes();
  const handleClick = (keyword: string) => (): void => {
    let includeParam = includeKeywords.join("|");
    const excludeParam = excludeKeywords.join("|");
    if (!includeKeywords || includeKeywords.length < 1) {
      includeParam = keyword;
    } else {
      includeParam += "|" + keyword;
    }
    history.push(
      location.pathname +
        "?include=" +
        includeParam +
        "&exclude=" +
        excludeParam
    );
  };
  const handleDelete = (keyword) => (): void => {
    const includeParams = [...includeKeywords];
    const idx = includeParams.indexOf(keyword);
    if (idx > -1) includeParams.splice(idx, 1);
    const includeParam = includeParams.join("|");
    const excludeParam = excludeKeywords.join("|");
    history.push(
      location.pathname +
        "?include=" +
        includeParam +
        "&exclude=" +
        excludeParam
    );
  };
  const cardStyle: CSSProperties = {
    maxWidth: "720px",
    margin: "0 auto",
    backgroundColor: "white",
    width: "80%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: "25px",
    marginTop: "25px",
    textOverflow: "ellipsis",
    padding: "0 20px",
    boxShadow: "0 8px 38px rgba(133, 133, 133, 0.3), 0 5px 12px #85858538",
  };

  const cardColumn: CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    textOverflow: "ellipsis",
    padding: "20px 0",
  };

  const cardColumnTop: CSSProperties = {
    marginTop: "20px",
    width: "100%",
    boxSizing: "border-box",
    textOverflow: "ellipsis",
    maxHeight: "256px",
    textAlign: "center",
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
    keywordsT: {
      display: "flex",
      alignItems: "center",
    },
  }));
  const classes = useStyles();

  return (
    <div style={cardStyle}>
      <div style={cardColumnTop}>
        {typeof img === "string" ? (
          <img
            style={{
              margin: "0 auto",
              height: "auto",
              maxHeight: "255px",
              maxWidth: "100%",
            }}
            src={img}
          />
        ) : null}
      </div>
      <div style={cardColumn}>
        <h3>
          <Link
            href={url}
            color="inherit"
            rel="noreferrer noopener"
            target="_blank"
          >
            {sections[category] ? sections[category] : "기타"} - {title}
          </Link>
        </h3>
        <h5>{`${year}/${month}/${date} ${time}`}</h5>
        <div className={classes.root}>
          {keywords.map((keyword, i) => {
            if (includeKeywords.includes(keyword.value)) {
              return (
                <Chip
                  variant="outlined"
                  size="small"
                  key={url + "-" + i}
                  onDelete={handleDelete(keyword.value)}
                  label={keyword.value}
                />
              );
            } else {
              return (
                <Chip
                  variant="outlined"
                  size="small"
                  key={url + "-" + i}
                  onClick={handleClick(keyword.value)}
                  label={keyword.value}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Card;
