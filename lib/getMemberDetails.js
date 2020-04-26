const profileRecordIds = {
  renowned: "379624208",
  medalist: "3800989613",
  goldMedalist: "1417584842",
  greatDeeds: "610196493",
  quintupleThreat: "1111992238",
};

const characterRecordIds = {
  showYourColors: "3996842932",
};

export default (res) => {
  const profileRecords = res.profileRecords;
  let details;

  if (!profileRecords.data) {
    // for some reason, the API doesn't return any record/triumph data for certain profiles
    details = { noRecords: true };
  } else {
    const getTotalRecordProgress = (recordName) => {
      return profileRecords.data.records[
        profileRecordIds[recordName]
      ].objectives.reduce((acc, objective) => acc + objective.progress, 0);
    };

    details = {
      laurels: getTotalRecordProgress("greatDeeds"),
      medals: getTotalRecordProgress("medalist"),
      goldMedals: getTotalRecordProgress("goldMedalist"),
    };
  }

  return details;
};
