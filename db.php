<html>
  <body>
    PHP!
    <pre>
    <?php
    $servername = "127.0.0.1";
    $username = "root";
    $password = "Gauranga";
    $dbname = "cursor";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully <br><br>";

    $sql = "SELECT * FROM coordinates";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
      // output data of each row
      while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " X: " . $row["x"]. " Y: " . $row["y"]. "<br>";
      }
    } else {
      echo "0 results";
    }
    $conn->close();
    ?>
    </pre>
  </body>
</html>
