const fs = require('fs');

// Function to split CSV file
function splitCSV(inputFilePath, outputFolderPath, rowsPerFile) {
  // Read the CSV file
  const csvData = fs.readFileSync(inputFilePath, 'utf8');
  const rows = csvData.split('\n');

  // Extract header
  const header = rows[0];

  // Create output folder if it doesn't exist
  if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath);
  }

  // Calculate the number of files needed
  const numFiles = Math.ceil((rows.length - 1) / rowsPerFile);

  // Split the rows into files
  for (let i = 0; i < numFiles; i++) {
    const startIndex = i * rowsPerFile + 1; // Skip the header
    const endIndex = startIndex + rowsPerFile;
    const fileRows = [header, ...rows.slice(startIndex, endIndex)];
    const outputFile = `${outputFolderPath}/output_${i + 1}.csv`;

    // Write the rows to a new CSV file
    fs.writeFileSync(outputFile, fileRows.join('\n'), 'utf8');
    if (i < numFiles - 1) {
      const fileContent = fs.readFileSync(outputFile, 'utf8');
      fs.writeFileSync(outputFile, fileContent.trim(), 'utf8');
    }
    console.log(`File ${i + 1} created: ${outputFile}`);
  }
}

// Example usage
const inputFilePath = 'input.csv'; // Replace with your input file path
const outputFolderPath = 'output'; // Replace with your desired output folder path
const rowsPerFile = 950;

splitCSV(inputFilePath, outputFolderPath, rowsPerFile);
