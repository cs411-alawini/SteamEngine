--Stored Procedure to get game name, number of upvotes, upvote score, number of comments, and all comments and their usernames:
DELIMITER //
CREATE PROCEDURE RetrieveGameRatings(IN game_ID INT)
BEGIN
    DECLARE totalRatings INT;
    DECLARE averageRating INT;
    DECLARE totalComments INT;
    DECLARE gameNameOne VARCHAR(255);
    DECLARE commentTextOne VARCHAR(2000);
    DECLARE userNameOne VARCHAR(255);
    DECLARE count INT DEFAULT 0;
    DECLARE done BOOLEAN DEFAULT FALSE;
    DECLARE commentCursor CURSOR FOR
        (SELECT CommentText, Username
        FROM Comments
        WHERE GameID = game_ID);
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    DROP TABLE IF EXISTS NewTable;
    CREATE TABLE NewTable(
	text VARCHAR(2000),
user VARCHAR(255)
    );
    
    OPEN commentCursor;

    cloop: LOOP
        FETCH commentCursor INTO commentTextOne, userNameOne;
	  SET count = count + 1;
	  IF done THEN 
LEAVE cloop;
	  END IF;
        INSERT INTO NewTable VALUES(commentTextOne, userNameOne);
    END LOOP cloop;


    CLOSE commentCursor;


    SELECT G.GameName, COUNT(C.CommentText) AS comments
    INTO gameNameOne, totalComments
    FROM GameInfo G NATURAL JOIN Comments C
    WHERE G.GameID = game_ID
    GROUP BY C.GameID;


    SELECT COUNT(Vote) AS Total, SUM(Vote) AS average
    INTO totalRatings, averageRating
    FROM Rating R
    GROUP BY R.GameID 
    HAVING R.GameID = game_ID;

    IF gameNameOne IS NULL THEN
	SELECT GameName INTO gameNameOne FROM GameInfo WHERE GameID = game_ID;    
    END IF;
	
    IF averageRating IS NULL THEN SET averageRating = 0; END IF;
    IF totalComments IS NULL THEN SET totalComments = 0; END IF;
    IF totalRatings IS NULL THEN SET totalRatings = 0; END IF;

    SELECT totalRatings AS TotalRatings, averageRating AS AverageRating, totalComments AS TotalComments, gameNameOne AS GameName;
	SELECT text AS Comments, user AS UserName FROM NewTable ;

    END //
DELIMITER ;


--Trigger to censor word "potty" in comments:
DELIMITER //
CREATE TRIGGER replace_potty_comment
BEFORE INSERT ON Comments
FOR EACH ROW
BEGIN
    IF NEW.CommentText LIKE '%potty%' THEN
        SET NEW.CommentText = REPLACE(NEW.CommentText, 'potty', '*****');
    END IF;
END;
//
DELIMITER ;

